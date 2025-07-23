import { AppContext } from '../../type'

export const getAllBbs = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const posts = await prisma.post.findMany({
      include: { author: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return c.json(posts)
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to fetch posts', message: e.message }, 500)
  }
}

export const getBbsById = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const id = Number(c.req.param('id'))
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { username: true } } },
    })
    if (!post) return c.json({ error: 'Post not found' }, 404)
    return c.json(post)
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to fetch post', message: e.message }, 500)
  }
}

export const searchBbs = async (c: AppContext) => {
  try {
    const prisma = c.get('prisma')
    const query = c.req.query('q')
    if (!query) return c.json({ error: 'Query parameter "q" is required' }, 400)
    const posts = await prisma.post.findMany({
      where: { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
      include: { author: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return c.json(posts)
  } catch (e: any) {
    console.error(e)
    return c.json({ error: 'Failed to search posts', message: e.message }, 500)
  }
}