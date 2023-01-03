import { neonColorState } from "atoms/randomNeonState"
import clsx from "clsx"
import { useRecoilState } from "recoil"

interface TrackProps {
  track?: string
  isSliding?: boolean
}

export const CurrentlyPlayingTrack = ({ track, isSliding }: TrackProps) => {
  const [color] = useRecoilState(neonColorState)

  return (
    <span
      className={clsx("whitespace-nowrap text-sm font-bold", {
        "animate-scroll": isSliding && !!track
      })}>
      {!!track ? "Currently Playing: " : "Not Listening"}
      {!!track && (
        <span
          className={clsx("font-normal", {
            "text-neon-blue": color === "neon-blue",
            "text-neon-yellow": color === "neon-yellow",
            "text-neon-pink": color === "neon-pink"
          })}>
          {track}
        </span>
      )}
    </span>
  )
}
