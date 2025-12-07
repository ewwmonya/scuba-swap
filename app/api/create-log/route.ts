import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const isoDate = new Date(body.dive_date).toISOString();

		const resp = await prisma.diveTestfordev.create({
			data: {
				userId: '801d22d2-6c5a-4c59-b2e7-ac1d03925d53',
				bottom_time: body.bottom_time,
				content: body.content,
				dive_date: isoDate,
				dive_number: body.dive_number,
				location: body.location,
				maximum_depth: body.maximum_depth,
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
