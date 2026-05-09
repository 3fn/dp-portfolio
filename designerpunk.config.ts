import { defineConfig } from '@3fn/core/config';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: 'DP-Portfolio',
  abbreviation: 'DPP',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components/core'],
  themes: [
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  output: './dist/tokens',
});
