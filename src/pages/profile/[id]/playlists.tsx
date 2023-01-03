import { LinkComponent } from "components"
import { useSSRSpotify } from "hooks/useSSRSpotify"
import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

interface ProfilePlaylistsProps {
  userData: any
  playlistsData: any[]
}

const ProfilePlaylists: NextPage<ProfilePlaylistsProps> = ({ userData, playlistsData }: ProfilePlaylistsProps) => {
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
        </div>
      </div>
      <div className="flex items-center justify-around border-b border-zinc-700 text-center font-medium text-zinc-400 ">
        <LinkComponent href={`/profile/${userData.id}`}>Talks</LinkComponent>
        <LinkComponent href={`/profile/${userData.id}/playlists`} isActive>
          Playlists
        </LinkComponent>
        <LinkComponent href={`/profile/${userData.id}/contacts`}>Contacts</LinkComponent>
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
