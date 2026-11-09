import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { prisma } from '@/lib/prismaActions';

export const dynamic = 'force-dynamic';
const PAGE_SIZE = 50;

export async function GET(request: Request) {
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

	const rawOffset = new URL(request.url).searchParams.get('offset') ?? '0';
	const offset = Number(rawOffset);
	if (!Number.isSafeInteger(offset) || offset < 0) {
		return NextResponse.json({ error: 'Offset must be a non-negative integer.' }, { status: 400 });
	}

	const posts = await prisma.post.findMany({
		select: {
			id: true,
			caption: true,
			content: true,
			imageUrl: true,
			createdAt: true,
			user: { select: { username: true } },
			_count: { select: { comments: true, likes: true } },
		},
		orderBy: { createdAt: 'desc' },
		skip: offset,
		take: PAGE_SIZE,
	});
	const total = await prisma.post.count();

	return NextResponse.json({
		posts: posts.map((post) => ({ ...post, createdAt: post.createdAt.toISOString() })),
		hasMore: offset + posts.length < total,
	});
}
