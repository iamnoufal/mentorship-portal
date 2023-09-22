import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "@/utils/context";
import { useState } from "react";
import type { UserType } from "@/utils/types";
import { UserDefaultData } from "@/utils/context";
import { SessionProvider } from "next-auth/react"

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
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </SessionProvider>
  );
}
