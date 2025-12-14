import { mockPosts } from '@/lib/posts';
import ForumCard from '@/components/forum/ForumCard';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getFeed = async () => {
	try {
		const data = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		return data;
	} catch (error) {
		return [];
	}
};
export async function ForumFeed({}) {
	const data = await getFeed();
	return (
		<div className='my-10'>
			{data.map((p) => {
				return (
					<Link key={`${p.id}`} href={`forum/${p.id}`}>
						<ForumCard data={p} />
					</Link>
				);
			})}
		</div>
	);
}
