import { Hono } from 'hono'
import { Bindings } from '../../type'
import { authMiddleware } from '../../middleware/auth'
import { getAllBbs, getBbsById, searchBbs } from './get'
import { createBbs } from './create'
import { editBbs } from './edit'
import { deleteBbs } from './delete'

const bbsRouter = new Hono<{ Bindings: Bindings }>()

// 認証不要ルート
bbsRouter.get('/', getAllBbs)
bbsRouter.get('/search', searchBbs)
bbsRouter.get('/:id', getBbsById)

// 認証必須ルート
bbsRouter.post('/create', authMiddleware, createBbs)
bbsRouter.put('/edit/:id', authMiddleware, editBbs)
bbsRouter.delete('/delete/:id', authMiddleware, deleteBbs)

export default bbsRouter