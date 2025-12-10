import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necessário para o CodeSandbox expor a porta
    port: 5173, // Porta padrão
    watch: {
      usePolling: true, // <--- ISSO É CRUCIAL no CodeSandbox para evitar erros de leitura
    },
  },
});
