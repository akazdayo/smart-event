import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solidJs()]
});