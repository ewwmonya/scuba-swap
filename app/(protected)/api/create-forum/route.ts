import { prisma } from '@/lib/prismaActions';
import { createServerClient } from '@supabase/ssr';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
			},
		}
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (user != null) {
		const body = await req.json();
		console.log(body, user.id);
		try {
			const resp = await prisma.post.create({
				data: {
					userId: user.id.toString(),
					caption: body?.caption,
					content: body?.content,
					id: randomUUID().toLocaleString(),
				},
			});
			return new Response(JSON.stringify(resp), {
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			console.error('ERROR creating dive log:', error);
			return new Response(JSON.stringify({ error: 'Server error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}
}
