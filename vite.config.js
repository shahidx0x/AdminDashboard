import react from "@vitejs/plugin-react";
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }), // Generates a visual bundle analysis
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    minify: false, // Explicitly using the terser plugin for minification
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`, // File name pattern for entry chunks
        chunkFileNames: `assets/[name].[hash].js`, // File name pattern for dynamic import chunks
        assetFileNames: `assets/[name].[hash].[ext]`, // File name pattern for other generated assets
      },
      plugins: [
        terser({
          ecma: 2021, // Specify ECMAScript version
          warnings: true,
          parse: {},
          compress: {
            defaults: false,
            unused: true,
            dead_code: true,
            drop_debugger: true,
            drop_console: true,
            ecma: 2021,
            global_defs: {
              "@alert": "console.log", // Replace "alert" calls with "console.log"
            },
            passes: 2, // Number of times to re-compress the top-level scopes
          },
          mangle: {
            properties: {
              regex: /^_/, // Mangle properties that start with an underscore
            },
          },
          format: {
            comments: false, // Remove comments
            beautify: false, // Minify
          },
          toplevel: true, // Enable top-level variable and function name mangling
          nameCache: null, // or specify a file to hold mangled name mappings
          ie8: false, // Set to true for IE8 support
          keep_classnames: undefined,
          keep_fnames: false, // Pass true to prevent the compressor from discarding function names
          safari10: false, // Set to true to work around the Safari 10 loop iterator bug "Cannot declare a let variable twice"
        }),
      ],
    },
  },
});
