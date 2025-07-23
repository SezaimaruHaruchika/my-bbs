import { AppContext } from '../../type'

export const deleteBbs = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const user = c.get('user')
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return c.json({ error: 'Post not found' }, 404)
    if (post.authorId !== user.id) return c.json({ error: 'Forbidden' }, 403)
    await prisma.post.delete({ where: { id } })
    return c.json({ message: 'Post deleted successfully' })
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to delete post', message: e.message }, 500)
  }
}