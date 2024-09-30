import "@/styles/globals.css";
import { Capriola, PT_Sans } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
});
const capriola = Capriola({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-capriola",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`app ${ptSans.variable} ${capriola.variable}`}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </>
  );
}
