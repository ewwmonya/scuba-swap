import PostCard, { PostType } from '@/components/posts-divelog/PostCard';
import { mockPosts } from '../../lib/posts';
import { Card, CardContent } from '../ui/card';
import { prisma } from '@/lib/prismaActions';

// temp async / stuff
const getFeed = async () => {
	try {
		const data = await prisma.dives.findMany();
		console.log(data);
		return data;
	} catch (error) {
		return [];
	}
};
async function Post() {
	const data = await getFeed();
	if (data.length > 1) {
		return (
			<article>
				{/* mock */}

				{data.map((post) => {
					return <PostCard key={post.id} post={post} />;
				})}
				{/* {mockPosts.map((post) => {
				return <PostCard key={post.id} post={post as unknown as PostType} />;
				})} */}
			</article>
		);
	} else {
		return <p>Refresh and try again later...</p>;
	}
}
export default Post;
