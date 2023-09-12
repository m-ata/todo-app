interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
