/**
 * Test script: Use figma_execute (Plugin API) via Console MCP
 * to extract boundVariables from the Desktop-110 mock.
 *
 * Requires: Desktop Bridge plugin running in Figma.
 * Usage: node_modules/.bin/tsx scripts/test-design-system-kit.ts
 */

import 'dotenv/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as fs from 'fs';
import * as path from 'path';

const FILE_KEY = 'yU7908VXR1khQN5hZXC6Cy';
const NODE_ID = '3435:72397'; // Desktop - 110
const OUTPUT_DIR = path.resolve('analysis/analysis-desktop-110');

// Plugin API code that walks the node tree and extracts boundVariables
const PLUGIN_CODE = `
const node = await figma.getNodeByIdAsync('${NODE_ID}');
if (!node) return JSON.stringify({ error: 'Node not found' });

const bindings = [];
const stats = { nodesWalked: 0, nodesWithBindings: 0 };

function extractBindings(n, depth) {
  if (depth > 6) return;
  stats.nodesWalked++;

  if ('boundVariables' in n && n.boundVariables) {
    const bv = {};
    let hasBinding = false;
    for (const [key, val] of Object.entries(n.boundVariables)) {
      if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
          bv[key] = val.map(v => ({ id: v.id, type: v.type }));
        } else {
          bv[key] = { id: val.id, type: val.type };
        }
        hasBinding = true;
      }
    }
    if (hasBinding) {
      stats.nodesWithBindings++;
      bindings.push({
        nodeId: n.id,
        nodeName: n.name,
        nodeType: n.type,
        boundVariables: bv
      });
    }
  }

  // Check fill-level boundVariables
  if ('fills' in n && Array.isArray(n.fills)) {
    for (const fill of n.fills) {
      if (fill.boundVariables) {
        const fbv = {};
        for (const [key, val] of Object.entries(fill.boundVariables)) {
          if (val && typeof val === 'object') {
            fbv[key] = { id: val.id, type: val.type };
          }
        }
        if (Object.keys(fbv).length > 0) {
          bindings.push({
            nodeId: n.id,
            nodeName: n.name,
            nodeType: n.type,
            source: 'fill',
            boundVariables: fbv
          });
        }
      }
    }
  }

  // Check stroke-level boundVariables
  if ('strokes' in n && Array.isArray(n.strokes)) {
    for (const stroke of n.strokes) {
      if (stroke.boundVariables) {
        const sbv = {};
        for (const [key, val] of Object.entries(stroke.boundVariables)) {
          if (val && typeof val === 'object') {
            sbv[key] = { id: val.id, type: val.type };
          }
        }
        if (Object.keys(sbv).length > 0) {
          bindings.push({
            nodeId: n.id,
            nodeName: n.name,
            nodeType: n.type,
            source: 'stroke',
            boundVariables: sbv
          });
        }
      }
    }
  }

  if ('children' in n && n.children) {
    for (const child of n.children) {
      extractBindings(child, depth + 1);
    }
  }
}

extractBindings(node, 0);
return JSON.stringify({ stats, bindings });
`.trim();

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error('ERROR: FIGMA_ACCESS_TOKEN not set. Check .env file.');
    process.exit(1);
  }

  console.log('Spawning figma-console-mcp...');
  const transport = new StdioClientTransport({
    command: 'node_modules/.bin/figma-console-mcp',
    args: [],
    env: { ...process.env, FIGMA_ACCESS_TOKEN: token, FIGMA_WS_PORT: '9223' },
  });

  const client = new Client({ name: 'bound-var-extract', version: '1.0.0' });
  await client.connect(transport);
  console.log('Connected.\n');

  // Call figma_execute with Plugin API code
  // First check status to see if Bridge is connected
  console.log('Waiting for Bridge connection (plugin scans every few seconds)...');
  let bridgeConnected = false;
  for (let i = 0; i < 15; i++) {
    const status = await client.callTool({ name: 'figma_get_status', arguments: {} });
    const statusContent = status.content as Array<{ type: string; text?: string }>;
    const statusText = statusContent?.[0]?.text ?? '';
    try {
      const s = JSON.parse(statusText);
      if (s.transport?.websocket?.available) {
        bridgeConnected = true;
        console.log(`Bridge connected! (port ${s.transport.websocket.port})`);
        break;
      }
    } catch {}
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, 2000));
  }

  if (!bridgeConnected) {
    console.error('\n\nBridge did not connect within 30s.');
    console.error('Please re-run the Desktop Bridge plugin in Figma and try again.');
    await client.close();
    process.exit(1);
  }

  console.log(`\nExecuting Plugin API on node ${NODE_ID}...`);
  const result = await client.callTool({
    name: 'figma_execute',
    arguments: { fileKey: FILE_KEY, code: PLUGIN_CODE },
  });

  // Parse result
  const content = result.content as Array<{ type: string; text?: string }>;
  let parsed: unknown;
  if (content?.[0]?.text) {
    try {
      parsed = JSON.parse(content[0].text);
    } catch {
      parsed = content[0].text;
    }
  } else {
    parsed = result;
  }

  // Write full dump
  const outputPath = path.join(OUTPUT_DIR, 'bound-variables-dump.json');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2));
  console.log(`Result written to: ${outputPath}`);

  // Print summary
  if (typeof parsed === 'object' && parsed !== null && 'stats' in (parsed as any)) {
    const data = parsed as { stats: { nodesWalked: number; nodesWithBindings: number }; bindings: any[] };
    console.log(`\n--- SUMMARY ---`);
    console.log(`Nodes walked: ${data.stats.nodesWalked}`);
    console.log(`Nodes with bindings: ${data.stats.nodesWithBindings}`);
    console.log(`Total binding entries: ${data.bindings.length}`);

    if (data.bindings.length > 0) {
      // Collect unique variable IDs
      const varIds = new Set<string>();
      for (const b of data.bindings) {
        for (const val of Object.values(b.boundVariables)) {
          if (val && typeof val === 'object' && 'id' in (val as any)) {
            varIds.add((val as any).id);
          }
        }
      }
      console.log(`Unique variable IDs referenced: ${varIds.size}`);
      console.log(`\nFirst 10 bindings:`);
      for (const b of data.bindings.slice(0, 10)) {
        const props = Object.keys(b.boundVariables).join(', ');
        console.log(`  ${b.nodeName} (${b.nodeType}${b.source ? ', ' + b.source : ''}) → ${props}`);
      }
    }
  } else {
    console.log('\nRaw result:', JSON.stringify(parsed, null, 2).slice(0, 500));
  }

  await client.close();
  console.log('\nDone.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
