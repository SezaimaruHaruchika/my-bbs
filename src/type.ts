import type { D1Database } from '@cloudflare/workers-types'

import { PrismaClient } from '@prisma/client'
import { Context } from 'hono'

// Environment Bindings: wrangler.tomlで設定される環境変数の型
export type Bindings = {
  DB: D1Database
  JWT_SECRET: string
}

// JWT Payload: JWTに含めるユーザー情報の型
export type UserPayload = {
  id: number
  username: string
}

// Hono's Context Variables: ミドルウェアでc.set()により設定される変数の型
export type Variables = {
  prisma: PrismaClient
  user: UserPayload
}

// カスタムコンテキスト型: HonoのContextに上記の型情報を統合
export type AppContext = Context<{
  Bindings: Bindings
  Variables: Variables
}>
