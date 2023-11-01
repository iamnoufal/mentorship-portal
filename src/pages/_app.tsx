import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "@/utils/context";
import { useState } from "react";
import type { UserType } from "@/utils/types";
import { UserDefaultData } from "@/utils/context";
import { SessionProvider } from "next-auth/react"
import Head from "next/head";

// DO NOT MODIFY THIS FILE
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  // fetch user data from context
  const [user, setUser] = useState<UserType>(UserDefaultData);

  // create loading state and theme state
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  return (
    <SessionProvider session={session}>
      <AppContext.Provider
        value={{ user, setUser, loading, setLoading, theme, setTheme }}
      ><Head>
      <meta name="application-name" content="Mentor Hub" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Mentor Hub" />
      <meta name="description" content="Find your mentors, because you can't learn experience from Google" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="/icons/android-chrome-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
      <link rel="apple-touch-icon" sizes="512x512" href="/icons/android-chrome-512x512.png" />

      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://mentorship-portal.vercel.app" />
      <meta name="twitter:title" content="Mentor Hub" />
      <meta name="twitter:description" content="Find your mentors, because you can't learn experience from Google" />
      <meta name="twitter:image" content="https://mentorship-portal.vercel.app/icons/android-chrome-192x192.png" />
      <meta name="twitter:creator" content="@_iam_noufal" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Mentor Hub" />
      <meta property="og:description" content="Find your mentors, because you can't learn experience from Google" />
      <meta property="og:site_name" content="Mentor Hub" />
      <meta property="og:url" content="https://mentorship-portal.vercel.app" />
      <meta property="og:image" content="https://mentorship-portal.vercel.app/icons/apple-touch-icon.png" />

    </Head>
        <Component {...pageProps} />
      </AppContext.Provider>
    </SessionProvider>
  );
}
