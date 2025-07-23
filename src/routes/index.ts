import { Hono } from 'hono'
import { Bindings } from '../type'
import authRouter from './auth'
import bbsRouter from './bbs'

const mainRouter = new Hono<{ Bindings: Bindings }>()

mainRouter.route('/api/auth', authRouter)
mainRouter.route('/bbs/api/posts', bbsRouter)

export default mainRouter