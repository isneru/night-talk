import { CurrentlyPlayingTrack } from "components"
import { useSpotify } from "hooks/useSpotify"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProfilePlaylists: NextPage = () => {
  const spotifyApi = useSpotify()
  const { id } = useRouter().query
  const [isLoading, setLoading] = useState(false)
  const [userData, setUserData] = useState<SpotifyApi.UserProfileResponse>()
  const [playlistsData, setPlaylistsData] = useState<SpotifyApi.PlaylistObjectSimplified[]>([])
  useEffect(() => {
    if (spotifyApi?.getAccessToken()) {
      setLoading(true)
      spotifyApi.getUserPlaylists(id as string).then(data => setPlaylistsData(data.body.items))
      spotifyApi
        .getUser(id as string)
        .then(data => setUserData(data.body))
        .then(() => setLoading(false))
    }
  }, [spotifyApi, setLoading])

  return (
    <div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="flex items-center gap-4 p-5">
            <img
              src={userData?.images[0].url ?? "#"}
              alt="spotify user profile picture"
              className="h-20 w-20 rounded-full"
            />
            <div className="flex flex-col justify-center">
              <strong>{userData?.display_name}</strong>
              <CurrentlyPlayingTrack />
            </div>
          </div>
          <div className="border-b  border-gray-700 text-center font-medium text-gray-400">
            <ul className="-mb-px flex flex-wrap">
              <li className="mr-2">
                <Link
                  href={`/profile/${userData.id}`}
                  className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300">
                  Talks
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href={`/profile/${userData.id}/playlists`}
                  className="inline-block rounded-t-lg border-b-2 border-blue-500 p-4 text-blue-500">
                  Playlists
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href={`/profile/${userData.id}/contacts`}
                  className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-3  p-4 md:grid-cols-2 lg:grid-cols-4">
            {playlistsData?.map(playlist => (
              <div key={playlist.name} className="flex h-24 gap-2 rounded bg-white/5 p-2">
                <img src={playlist.images[0].url} className="aspect-square h-20 w-20 rounded object-cover" />
                <div className="flex flex-col overflow-y-auto">
                  <a href={playlist.external_urls.spotify} className="font-bold hover:underline">
                    {playlist.name}
                  </a>
                  <span className="text-zinc-400">
                    {playlist.description !== "" ? playlist.description : "No description."}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePlaylists
