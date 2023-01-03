import { neonColorState } from "atoms/randomNeonState"
import clsx from "clsx"
import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { useRecoilState } from "recoil"

interface LinkComponentProps extends LinkProps {
  children: ReactNode
  isActive?: boolean
}

export const LinkComponent = (props: LinkComponentProps) => {
  const [color] = useRecoilState(neonColorState)
  return (
    <Link
      className={clsx("flex-grow border-b px-4 py-1 text-center transition-colors", {
        "border-neon-blue text-neon-blue hover:bg-neon-blue/5": color === "neon-blue" && props.isActive,
        "border-neon-yellow text-neon-yellow hover:bg-neon-yellow/5": color === "neon-yellow" && props.isActive,
        "border-neon-pink text-neon-pink hover:bg-neon-pink/5": color === "neon-pink" && props.isActive,
        "border-transparent text-zinc-400 hover:border-zinc-300 hover:bg-zinc-300/5 hover:text-zinc-300":
          !props.isActive
      })}
      {...props}>
      {props.children}
    </Link>
  )
}
