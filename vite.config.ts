import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@interfaces': path.resolve(__dirname, './src/interfaces/'),
      '@redux': path.resolve(__dirname, './src/redux/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/variables.scss";
        @import "./src/styles/global.scss";
        @import "./src/styles/mixins.scss";
        `,
      }
    }
  }
});
