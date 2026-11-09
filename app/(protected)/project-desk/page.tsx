export const dynamic = 'force-dynamic';

import ProjectDesk from './project-desk';
import { prisma } from '@/lib/prismaActions';

const postSelect = {
	id: true,
	caption: true,
	content: true,
	imageUrl: true,
	createdAt: true,
	user: { select: { username: true } },
	_count: { select: { comments: true, likes: true } },
} as const;

export default async function ProjectDeskPage() {
	const [postCount, diveCount, memberCount, commentCount, recentPosts, recentDives] =
		await Promise.all([
			prisma.post.count(),
			prisma.dives.count(),
			prisma.user.count(),
			prisma.postComment.count(),
			prisma.post.findMany({
				select: postSelect,
				orderBy: { createdAt: 'desc' },
				take: 50,
			}),
			prisma.dives.findMany({
				select: {
					id: true,
					location: true,
					content: true,
					dive_number: true,
					dive_date: true,
					user: { select: { username: true } },
					_count: { select: { comments: true, likes: true } },
				},
				orderBy: { dive_date: 'desc' },
				take: 6,
			}),
		]);

	return (
		<ProjectDesk
			stats={{ postCount, diveCount, memberCount, commentCount }}
			initialPosts={recentPosts.map((post) => ({
				...post,
				createdAt: post.createdAt.toISOString(),
			}))}
			recentDives={recentDives.map((dive) => ({
				...dive,
				dive_date: dive.dive_date.toISOString(),
			}))}
		/>
	);
}
