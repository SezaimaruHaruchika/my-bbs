import { sign, verify } from 'hono/jwt'

// JWT署名関数
export const signJwt = async (payload: any, secret: string) => {
  return await sign(payload, secret)
}

// JWT検証関数
export const verifyJwt = async (token: string, secret: string) => {
  return await verify(token, secret)
}