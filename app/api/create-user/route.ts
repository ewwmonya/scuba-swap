import { PrismaClient } from '@/lib/generated/prisma/client';

const prisma = new PrismaClient();
export async function POST(req: Request) {
	const { email, username } = await req.json();

	const userEmail = await prisma.user.findUnique({ where: { email } });
	if (userEmail) return new Response(null, { status: 200 });

	await prisma.user.create({
		data: {
			email: email,
			username: username,
		},
	});

	return new Response(null, { status: 201 });
}
