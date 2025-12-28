import { prisma } from '@/lib/prismaActions';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const isoDate = new Date(body?.values?.dive_date).toISOString();

		const resp = await prisma.dives.create({
			data: {
				userId: body.userId,
				bottom_time: body?.values?.bottom_time,
				content: body?.values?.content,
				dive_date: isoDate,
				dive_number: body?.values?.dive_number,
				location: body?.values?.location,
				maximum_depth: body?.values?.maximum_depth,
				water_temperature_surface: body?.values?.water_temperature_surface,
				entry_time: body?.values?.entry_time,
				exit_time: body?.values?.exit_time,
				id: '',
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
