/**
 * Resolve variable IDs to names via Plugin API.
 * Requires Desktop Bridge running.
 *
 * Usage: node_modules/.bin/tsx scripts/resolve-variable-ids.ts
 */

import 'dotenv/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as fs from 'fs';

const FILE_KEY = 'yU7908VXR1khQN5hZXC6Cy';
const OUTPUT = 'analysis/analysis-desktop-110/resolved-variables.json';

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) { console.error('FIGMA_ACCESS_TOKEN not set'); process.exit(1); }

  // Load variable IDs from the binding dump
  const raw = JSON.parse(fs.readFileSync('analysis/analysis-desktop-110/bound-variables-dump.json', 'utf8'));
  const data = typeof raw.result === 'string' ? JSON.parse(raw.result) : raw.result;

  const varIds = new Set<string>();
  for (const b of data.bindings) {
    for (const val of Object.values(b.boundVariables) as any[]) {
      if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
          for (const v of val) { if (v.id) varIds.add(v.id); }
        } else if (val.id) varIds.add(val.id);
      }
    }
  }

  const ids = [...varIds];
  console.log(`Resolving ${ids.length} variable IDs...`);

  const code = `
const results = {};
const ids = ${JSON.stringify(ids)};
for (const id of ids) {
  try {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) {
      const collection = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
      results[id] = { name: v.name, resolvedType: v.resolvedType, collection: collection ? collection.name : 'unknown' };
    } else {
      results[id] = { name: null, error: 'not found' };
    }
  } catch (e) {
    results[id] = { name: null, error: String(e) };
  }
}
return JSON.stringify(results);
`.trim();

  const transport = new StdioClientTransport({
    command: 'node_modules/.bin/figma-console-mcp',
    args: [],
    env: { ...process.env, FIGMA_ACCESS_TOKEN: token, FIGMA_WS_PORT: '9223' },
  });

  const client = new Client({ name: 'resolve-vars', version: '1.0.0' });
  await client.connect(transport);

  // Wait for Bridge
  console.log('Waiting for Bridge...');
  for (let i = 0; i < 15; i++) {
    const status = await client.callTool({ name: 'figma_get_status', arguments: {} });
    const st = status.content as Array<{ type: string; text?: string }>;
    try {
      const s = JSON.parse(st?.[0]?.text ?? '{}');
      if (s.transport?.websocket?.available) { console.log('Connected!'); break; }
    } catch {}
    if (i === 14) { console.error('Bridge timeout'); await client.close(); process.exit(1); }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, 2000));
  }

  // Execute
  const result = await client.callTool({ name: 'figma_execute', arguments: { fileKey: FILE_KEY, code } });
  const content = result.content as Array<{ type: string; text?: string }>;
  let parsed: any;
  if (content?.[0]?.text) {
    try {
      const outer = JSON.parse(content[0].text);
      parsed = typeof outer.result === 'string' ? JSON.parse(outer.result) : outer.result ?? outer;
    } catch { parsed = content[0].text; }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(parsed, null, 2));
  console.log(`\nResolved variables written to: ${OUTPUT}\n`);

  // Print summary
  if (typeof parsed === 'object') {
    for (const [id, info] of Object.entries(parsed as Record<string, any>)) {
      const usage = data.bindings.filter((b: any) =>
        Object.values(b.boundVariables).some((v: any) =>
          (Array.isArray(v) ? v.some(x => x.id === id) : v?.id === id)
        )
      ).length;
      console.log(`  ${(info.name ?? '???').padEnd(30)} ${info.collection?.padEnd(15) ?? ''} ${info.resolvedType?.padEnd(8) ?? ''} (${usage}x)`);
    }
  }

  await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
