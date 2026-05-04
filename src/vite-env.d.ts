/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAND_NAME: string;
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE: string;
  readonly VITE_WHATSAPP: string;
  readonly VITE_TWITTER_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_INSTAGRAM_URL: string;
  readonly VITE_FORMSPREE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
