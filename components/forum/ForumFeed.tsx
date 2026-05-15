import { mockPosts } from '@/lib/posts';
import ForumCard from '@/components/forum/ForumCard';
import Link from 'next/link';
import { prisma } from '@/lib/prismaActions';

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
		<div className='my-10 min-h-full'>
			{data.map((p) => {
				const slug = p.caption.replaceAll(' ', '-');
				return (
					<Link key={`${p.id}`} href={`forum/${slug}`}>
						<ForumCard data={p} />
					</Link>
				);
			})}
		</div>
	);
}
