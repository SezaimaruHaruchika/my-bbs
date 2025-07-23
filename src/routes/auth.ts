import { Hono } from 'hono'
import { setCookie, deleteCookie } from 'hono/cookie'
import bcrypt from 'bcryptjs'
import { AppContext, Bindings, UserPayload } from '../type'
import { signJwt } from '../utils/jwt'

const authRouter = new Hono<{ Bindings: Bindings }>()

// アカウント作成
authRouter.post('/signup', async (c: AppContext) => {
  const prisma = c.get('prisma')
  const { username, password } = await c.req.json()
  if (!username || !password) return c.json({ error: 'Username and password are required' }, 400)
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({ data: { username, password: hashedPassword } })
    return c.json({ id: user.id, username: user.username }, 201)
  } catch (e) {
    return c.json({ error: 'Username already exists' }, 409)
  }
})

// ログイン
authRouter.post('/login', async (c: AppContext) => {
  const prisma = c.get('prisma')
  const { username, password } = await c.req.json()
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return c.json({ error: 'Invalid credentials' }, 401)
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return c.json({ error: 'Invalid credentials' }, 401)
  const payload: UserPayload = { id: user.id, username: user.username }
  const token = await signJwt(payload, c.env.JWT_SECRET)
  setCookie(c, 'token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 24 })
  return c.json({ message: 'Logged in successfully' })
})

// ログアウト
authRouter.delete('/logout', async (c: AppContext) => {
  deleteCookie(c, 'token')
  return c.json({ message: 'Logged out successfully' })
})

export default authRouter