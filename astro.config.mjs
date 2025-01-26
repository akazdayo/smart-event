import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  integrations: [tailwind(), solidJs()],
  adapter: cloudflare(),
  vite: {
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(process.env.GEMINI_API_KEY),
    },
  },
});