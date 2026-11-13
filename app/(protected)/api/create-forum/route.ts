import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { z } from 'zod';

const createForumSchema = z.object({
  caption: z.string().trim().min(10).max(200),
  content: z.string().trim().min(10),
  categoryId: z.string().min(1),
});

export async function POST(req: Request) {
  const user = await getCurrentUserProfile();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createForumSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid forum post', details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: parsed.data.categoryId },
      select: { id: true },
    });
    if (!category) return Response.json({ error: 'Invalid category' }, { status: 400 });

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        caption: parsed.data.caption.replaceAll('-', ' '),
        content: parsed.data.content,
        categoryId: category.id,
      },
    });
    return Response.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating forum post:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
