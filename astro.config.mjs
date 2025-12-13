// @ts-check

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-expect-error - Tailwind vite plugin has version conflicts with Astro's Vite
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
