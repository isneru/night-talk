import { CurrentlyPlayingTrack } from "components"
import { useSSRSpotify } from "hooks/useSSRSpotify"
import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "pages/api/auth/[...nextauth]"

interface ProfilePlaylistsProps {
  userData: any
}

const ProfilePlaylists: NextPage<ProfilePlaylistsProps> = ({ userData }: ProfilePlaylistsProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 p-5">
        <img
          src={userData?.images[0].url}
          alt="spotify user profile picture"
          className="aspect-square h-20 w-20 rounded-full object-cover"
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
              className="inline-block rounded-t-lg border-b-2 border-transparent px-4 py-1 hover:border-gray-300 hover:text-gray-300">
              Talks
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/profile/${userData.id}/playlists`}
              className="inline-block rounded-t-lg border-b-2 border-transparent px-4 py-1 hover:border-gray-300 hover:text-gray-300">
              Playlists
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/profile/${userData.id}/contacts`}
              className="inline-block rounded-t-lg border-b-2 border-blue-500 px-4 py-1 text-blue-500">
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePlaylists

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)
  const spotifyApi = useSSRSpotify(session)

  const id = ctx.params!["id"]
  if (spotifyApi?.getAccessToken()) {
    const playlistsData = await spotifyApi.getUserPlaylists(id as string)
    const userData = await spotifyApi.getUser(id as string)
    return { props: { playlistsData: playlistsData.body.items, userData: userData.body } }
  }
  return {
    props: {}
  }
}
