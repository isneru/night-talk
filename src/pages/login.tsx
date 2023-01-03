import type { GetServerSideProps, NextPage } from "next"
import { getSession, signIn } from "next-auth/react"
import { SpotifyLogo } from "phosphor-react"

const Login: NextPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center ">
      <button
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
        className="flex items-center gap-2 rounded-lg border border-neon-blue px-2 py-1 text-neon-blue transition-colors hover:bg-neon-blue hover:text-mainbg">
        <SpotifyLogo size={40} />
        <span className="font-bold uppercase">Sign In with Spotify</span>
      </button>
    </main>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return { props: {} }
  }

  return {
    props: {},
    redirect: {
      destination: "/",
      permanent: false
    }
  }
}
