import { Layout } from "components"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import "styles/globals.css"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  )
}
