/* eslint-disable @next/next/no-img-element */
import { CurrentlyPlayingTrack } from "components"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"

const Profile: NextPage = () => {
  const { data: session, status } = useSession()
  return (
    <div>
      <div className="flex items-center gap-4 p-5">
        <img
          src={session?.user?.image as string}
          alt="spotify user profile picture"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <strong>{session?.user?.name}</strong>
          <CurrentlyPlayingTrack />
        </div>
      </div>
      <div className="border-b  border-gray-700 text-center text-sm  font-medium text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          <li className="mr-2">
            <Link
              href={`/profile/${session?.user.username}/posts`}
              className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300">
              Talks
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/profile/${session?.user.username}/playlists`}
              className="active inline-block rounded-t-lg border-b-2 border-blue-500 p-4 text-blue-500">
              Playlists
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/profile/${session?.user.username}/contacts`}
              className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-300">
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
