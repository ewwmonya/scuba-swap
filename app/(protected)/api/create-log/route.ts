import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

export async function POST(req: Request) {
	const user = await getCurrentUserProfile();
	try {
		const body = await req.json();

		const isoDate = new Date(body?.values?.dive_date).toISOString();
		if (!user) {
			throw new Error('NO No');
		}
		const resp = await prisma.dives.create({
			data: {
				userId: user?.id,
				bottom_time: body?.values?.bottom_time,
				content: body?.values?.content,
				dive_date: isoDate,
				dive_number: body?.values?.dive_number,
				location: body?.values?.location,
				maximum_depth: body?.values?.maximum_depth,
				water_temperature_surface: body?.values?.water_temperature_surface,
				entry_time: body?.values?.entry_time,
				exit_time: body?.values?.exit_time,
			},
		});

		console.log('Ran');

		return new Response(JSON.stringify({ resp, isoDate }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('ERROR creating dive log:', error);
		return new Response(JSON.stringify({ error: 'Server error', msg: error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
