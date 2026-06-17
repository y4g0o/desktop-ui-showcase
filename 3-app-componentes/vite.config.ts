import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidPlugin(),
    autoImport({
      imports: ["solid-js"],
      dirs: ["./src/ui"],
      dts: true
    })
  ]
});
