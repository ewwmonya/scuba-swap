import { prisma } from '@/lib/prismaActions';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
	const body = await req.json();
	console.log(`api: ${body.values}`);
	try {
		const resp = await prisma.post.create({
			data: {
				userId: body.userEmail,
				caption: body?.values?.caption,
				content: body?.values?.content,
				id: randomUUID().toLocaleString(),
			},
		});
		console.log('Created dive log:', resp);

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
