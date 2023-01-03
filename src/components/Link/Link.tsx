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
      className={clsx("inline-block rounded-t-lg border-b-2 px-4 py-1 transition-colors", {
        "border-neon-blue text-neon-blue": color === "neon-blue" && props.isActive,
        "border-neon-yellow text-neon-yellow": color === "neon-yellow" && props.isActive,
        "border-neon-pink text-neon-pink": color === "neon-pink" && props.isActive,
        "border-transparent text-zinc-400 hover:border-zinc-300 hover:text-zinc-300": !props.isActive
      })}
      {...props}>
      {props.children}
    </Link>
  )
}
