import { createMiddleware } from 'hono/factory'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { Bindings, Variables } from '../type'

export const prisma = createMiddleware<{
  Bindings: Bindings
  Variables: Variables
}>(async (c, next) => {
  // コンテキストにprismaインスタンスがなければ新規作成
  if (!c.get('prisma')) {
    const adapter = new PrismaD1(c.env.DB)
    const prisma = new PrismaClient({ adapter })
    c.set('prisma', prisma) // コンテキストに設定
  }
  await next()
})
