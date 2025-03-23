import '@/app/globals.css'; // Import global styles
import { ThemeProvider } from "@/components/utility/theme-provider";
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
