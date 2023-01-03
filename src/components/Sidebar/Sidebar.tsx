/* eslint-disable @next/next/no-img-element */
import { CurrentlyPlayingTrack } from "components"
import { useSpotify } from "hooks/useSpotify"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { House, SignIn, SignOut, User } from "phosphor-react"
import { useEffect, useState } from "react"

export const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [spotifyData, setSpotifyData] = useState<any>()
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<string | null>()
  //const currentlyPlaying = useRecoilValue(currentlyPlayingState)

  function isAuthenticated() {
    return status === "authenticated"
  }

  useEffect(() => {
    if (spotifyApi?.getAccessToken()) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setSpotifyData(data)
        setCurrentlyPlayingTrack(data?.body?.item?.name ?? null)
      })
    }
  }, [session, spotifyApi])

  return (
    <aside className="sidebar flex h-screen w-60 flex-col bg-mainbg p-5 text-zinc-400">
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:text-white">
          <House size={20} />
          <span>Home</span>
        </Link>
        <Link href={`/profile/${session?.user.username}`} className="flex items-center gap-2 hover:text-white">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>
      <div className="mt-auto">
        <button
          onClick={() => (isAuthenticated() ? signOut() : signIn("spotify"))}
          className="mb-4 flex items-center gap-2 hover:text-white">
          {isAuthenticated() ? <SignOut size={20} /> : <SignIn size={20} />}
          <span>{isAuthenticated() ? "Logout" : "Login"}</span>
        </button>
        {isAuthenticated() && (
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full"
              src={session?.user?.image as string}
              alt="spotify profile picture"
            />
            <div className="flex flex-col overflow-hidden">
              <strong>{session?.user?.name}</strong>
              <CurrentlyPlayingTrack />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
