import { defineConfig } from "vite";
import Sass from "sass";
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  base: "./",
  plugins: [
    Inspect()
  ],
});


