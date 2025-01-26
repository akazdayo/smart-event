import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  integrations: [tailwind(), solidJs()],
  adapter: cloudflare()
});