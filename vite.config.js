import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace 'geordi-robinson-portfolio' with your exact GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: "/geordi-portfolio/",
});
