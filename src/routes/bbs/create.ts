import { AppContext } from '../../type'

export const createBbs = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const user = c.get('user')
    const { title, description } = await c.req.json<{ title: string; description: string }>()
    if (!title || !description) return c.json({ error: 'Title and description are required' }, 400)
    const newPost = await prisma.post.create({ data: { title, description, authorId: user.id } })
    return c.json(newPost, 201)
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to create post', message: e.message }, 500)
  }
}