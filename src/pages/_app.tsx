import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";

import { Layout } from "@/components/Layout";
import { SaveToastProvider } from "@/components/SaveToast";
import { initErrorReporting } from "@/lib/error-reporting";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window !== "undefined" && "plausible" in window) {
    const w = window as unknown as { plausible: (event: string, opts: { props: Record<string, string | number> }) => void };
    w.plausible("Web Vitals", {
      props: { name: metric.name, value: Math.round(metric.value) },
    });
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initErrorReporting();
  }, []);

  return (
    <SaveToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SaveToastProvider>
  );
}
