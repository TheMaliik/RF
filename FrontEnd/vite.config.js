import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    server: {
      proxy: {
        "/register": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
        "/getUsers": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };

  // if (command !== "serve") {
  //   config.base = "/react-face-auth/";
  // }

  return config;
});
