import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

export async function POST(req: Request) {
	// Get user logged in
	const resp = await getCurrentUserProfile();
	// Set user variable
	const user = resp;
	const commentData = await req.json();
	if (user != null) {
		try {
			if (commentData.commentType == 'Form') {
				const commentResp = await prisma.postComment.create({
					data: {
						userId: user.id,
						postId: commentData?.postId,
						content: commentData?.comment,
					},
				});
				console.log(commentResp);
				return new Response(JSON.stringify(commentResp), {
					status: 201,
					headers: { 'Content-Type': 'application/json' },
				});
			} else if (commentData.commentType == 'DiveFeed') {
				const commentResp = await prisma.diveComment.create({
					data: {
						userId: user.id,
						diveId: commentData?.divePostId,
						content: commentData?.comment,
					},
				});
				console.log(commentResp);
				return new Response(JSON.stringify(commentResp), {
					status: 201,
					headers: { 'Content-Type': 'application/json' },
				});
			}
		} catch (error) {
			console.log(error);
			return new Response(JSON.stringify(error), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}
}
