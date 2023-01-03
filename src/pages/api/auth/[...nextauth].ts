import spotifyApi, { LOGIN_URL } from "lib/spotify"
import NextAuth, { Account, AuthOptions, Session, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import SpotifyProvider from "next-auth/providers/spotify"
import { prisma } from "service/prisma"

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1h
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "",
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({
      token,
      account,
      user
    }: {
      token: JWT
      user?: User | AdapterUser | undefined
      account?: Account | null | undefined
    }) {
      if (account && user) {
        const userExists = await prisma?.user.findFirst({
          where: {
            id: user.id
          }
        })
        if (!userExists) {
          await prisma?.user.create({
            data: {
              username: user.name as string,
              id: user.id,
              email: user.email as string,
              image: user.image as string,
              accessToken: account.access_token as string,
              refreshToken: account.refresh_token as string
            }
          })
        }
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account.expires_at as number) * 1000
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }
  }
}

export default NextAuth(authOptions)
