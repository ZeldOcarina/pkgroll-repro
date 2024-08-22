import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    commonjs({
      include: "node_modules/**",
      exclude: "**/*.node", // Exclude .node files
    }),
  ],
  ssr: {
    external: ["fsevents"],
    noExternal: [
      "lightningcss",
      "fsevents",
      "react-icons",
      "@googlemaps/js-api-loader",
      "@yaireo/tagify",
    ],
  },
  optimizeDeps: {
    exclude: ["fsevents"],
  },
});
