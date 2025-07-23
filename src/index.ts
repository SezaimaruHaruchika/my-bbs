import { Hono } from 'hono'
import { prisma } from './middleware/prisma'
import { Bindings } from './type'
import mainRouter from './routes'

const app = new Hono<{ Bindings: Bindings }>()

app.get("/", (c) => c.text("Hello, Hono!"));

// グローバルミドルウェア: 全てのリクエストでPrisma Clientを有効化
app.use('*', prisma)

// メインルーターを適用
app.route('/', mainRouter)

export default app