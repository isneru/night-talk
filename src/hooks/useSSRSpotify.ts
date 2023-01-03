import spotifyApi from "lib/spotify"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
export const useSSRSpotify = (session: Session | null) => {
  if (session) {
    if ((session as any).error === "RefreshAccessTokenError") {
      signIn("spotify")
    }

    spotifyApi.setAccessToken(session?.user?.accessToken!)
  }

  return spotifyApi
}
