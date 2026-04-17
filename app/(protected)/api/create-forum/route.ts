import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

export async function POST(req: Request) {
	// Get user logged in
	const resp = await getCurrentUserProfile();
	// Set user variable
	const user = resp;

	// if the user is defined do below
	if (user != null) {
		const body = await req.json();
		console.log(body, user);

		try {
			// set new user count. Later in life this will need to scale
			const newIdNumber = (await prisma.post.count()) + 1000;
			console.log(newIdNumber);

			const resp = await prisma.post.create({
				data: {
					userId: user?.id,
					caption: body?.caption,
					content: body?.content,
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
