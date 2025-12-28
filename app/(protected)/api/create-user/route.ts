import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: Request) {
	const { email, username, uuID_auth, id } = await req.json();

	const userEmail = await prisma.user.findUnique({ where: { email } });
	if (userEmail) return new Response(null, { status: 200 });

	await prisma.user.create({
		data: {
			id: id,
			email: email,
			username: username,
			uuID_auth: uuID_auth,
		},
	});

	return new Response(null, { status: 201 });
}
