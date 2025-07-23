import { AppContext } from '../../type'

export const editBbs = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const user = c.get('user')
    const { title, description } = await c.req.json<{ title?: string; description?: string }>()
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return c.json({ error: 'Post not found' }, 404)
    if (post.authorId !== user.id) return c.json({ error: 'Forbidden' }, 403)
    const editBbs = await prisma.post.update({ where: { id }, data: { title, description } })
    return c.json(editBbs)
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to update post', message: e.message }, 500)
  }
}