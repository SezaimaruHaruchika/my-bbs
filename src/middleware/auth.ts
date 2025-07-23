import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import { Bindings, UserPayload, Variables } from '../type'
import { verifyJwt } from '../utils/jwt'

export const authMiddleware = createMiddleware<{
  Bindings: Bindings
  Variables: Variables
}>(async (c, next) => {
  const token = getCookie(c, 'token')
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const payload = await verifyJwt(token, c.env.JWT_SECRET)
    
    const user: UserPayload = {
      id: payload.id as number,
      username: payload.username as string,
    }

    if (!user.id || !user.username) {
      return c.json({ error: 'Invalid token payload' }, 401)
    }

    c.set('user', user)
    await next()
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
})