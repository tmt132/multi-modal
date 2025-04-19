import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "multi-modal": path.resolve(__dirname, "../../dist"), // 실제 소스 폴더로 연결
    },
  },
});
