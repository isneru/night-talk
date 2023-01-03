import spotifyApi from "lib/spotify"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
export const useSpotify = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      if ((session as any).error === "RefreshAccessTokenError") {
        signIn("spotify")
      }

      spotifyApi.setAccessToken(session?.user?.accessToken!)
    }
  }, [session])

  return spotifyApi
}
