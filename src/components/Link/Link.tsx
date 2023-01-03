import clsx from "clsx"
import { useRandomNeon } from "hooks/useRandomNeon"
import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

interface LinkComponentProps extends LinkProps {
  children: ReactNode
  isActive?: boolean
}

export const LinkComponent = (props: LinkComponentProps) => {
  const color = useRandomNeon()
  return (
    <Link
      className={clsx("flex-grow border-b py-1 px-4 text-center transition-colors", {
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
