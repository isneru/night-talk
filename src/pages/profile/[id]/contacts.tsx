import { LinkComponent } from "components"
import { useSSRSpotify } from "hooks/useSSRSpotify"
import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
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
        </div>
      </div>
      <div className="flex items-center justify-around border-b border-zinc-700 text-center font-medium text-zinc-400 ">
        <LinkComponent href={`/profile/${userData.id}`}>Talks</LinkComponent>
        <LinkComponent href={`/profile/${userData.id}/playlists`}>Playlists</LinkComponent>
        <LinkComponent href={`/profile/${userData.id}/contacts`} isActive>
          Contacts
        </LinkComponent>
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
    const userData = await spotifyApi.getUser(id as string)
    return { props: { userData: userData.body } }
  }
  return {
    props: {}
  }
}
