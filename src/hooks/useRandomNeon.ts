export const useRandomNeon = () => {
  const colors = ["neon-blue", "neon-yellow", "neon-pink"]

  return colors[Math.floor(Math.random() * colors.length)]
}
