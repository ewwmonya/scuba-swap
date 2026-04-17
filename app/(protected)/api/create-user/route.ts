import { prisma } from '@/lib/prismaActions';

export async function POST(req: Request) {
	const { email, username, authId } = await req.json();

	const userEmail = await prisma.user.findUnique({ where: { email } });
	if (!userEmail) {
		try {
			await prisma.user.create({
				data: {
					authId,
					email,
					username,
				},
			});
		} catch (error) {
			console.log(error);
		}

		return new Response(null, { status: 200 });
	}

	return new Response(null, { status: 201 });
}
