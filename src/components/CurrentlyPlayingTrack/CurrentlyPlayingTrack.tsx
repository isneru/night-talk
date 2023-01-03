import clsx from "clsx"
import { useRandomNeon } from "hooks/useRandomNeon"
import { useState } from "react"

interface TrackProps {
  track?: string
  isSliding?: boolean
}

export const CurrentlyPlayingTrack = ({ track, isSliding }: TrackProps) => {
  const [color] = useState(useRandomNeon())

  return (
    <span className={clsx("whitespace-nowrap text-sm font-bold")}>
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
