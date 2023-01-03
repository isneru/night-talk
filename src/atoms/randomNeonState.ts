import { useRandomNeon } from "hooks/useRandomNeon"
import { atom } from "recoil"

export const neonColorState = atom({
  key: "neonColorState",
  default: useRandomNeon()
})
