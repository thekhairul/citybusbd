import "@/styles/globals.css";
import { registerServiceWorker } from "@/utils/registerSW";
import { Capriola, Noto_Sans_Bengali } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const notoSans = Noto_Sans_Bengali({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
const capriola = Capriola({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-capriola",
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
      return () => window.removeEventListener('load', registerServiceWorker);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`app ${notoSans.variable} ${capriola.variable}`}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </>
  );
}
