import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Layout } from "@/components/Layout";
import { SaveToastProvider } from "@/components/SaveToast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SaveToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SaveToastProvider>
  );
}
