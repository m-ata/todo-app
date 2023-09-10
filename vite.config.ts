import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const port = parseInt(process.env.VITE_PORT || '') || 3000;

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
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@hoc': path.resolve(__dirname, './src/hoc/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/variables.scss";
        @import "./src/styles/global.scss";
        @import "./src/styles/mixins.scss";
        `,
      },
    },
  },
  server: {
    port,
  },
});
