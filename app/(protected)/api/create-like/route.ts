import { prisma } from '@/lib/prismaActions';

export async function POST(req: Request) {
	const body = await req.json();
	const { postId, currentUserId } = body;
	let resp = null;
	const existingLike =
		(
			(await prisma.diveLike.findUnique({
				where: {
					userId_diveId: {
						diveId: postId,
						userId: currentUserId,
					},
				},
			})) == null
		) ?
			false
		:	true;
	// console.log(currentUserLike);
	try {
		if (!existingLike) {
			resp = await prisma.diveLike.create({
				data: {
					diveId: postId,
					userId: currentUserId,
				},
			});
			// console.log(resp);
		} else {
			resp = await prisma.diveLike.delete({
				where: {
					userId_diveId: {
						diveId: postId,
						userId: currentUserId,
					},
				},
			});
		}
		const count = await prisma.diveLike.count({
			where: {
				diveId: postId,
			},
		});
		return new Response(
			JSON.stringify({ resp, liked: existingLike, diveLikesCount: count }),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
