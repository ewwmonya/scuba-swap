import PostCard from './PostCard';
import { mockPosts } from '../../lib/posts';
import { Card, CardContent } from '../ui/card';
import { PrismaClient } from '@prisma/client';

// temp async / stuff
const prisma = new PrismaClient();
const getFeed = async () => {
	try {
		const data = await prisma.diveTestfordev.findMany();
		return data;
	} catch (error) {
		return [];
	}
};
async function Post() {
	const data = await getFeed();
	if (data) {
	}
	return (
		<article>
			{/* mock */}
			{/* 
			{mockPosts.map((post) => {
				return <PostCard key={post.id} post={post} />;
				})} */}
			{data?.map((post) => {
				return (
					<Card key={post?.id}>
						<CardContent>
							<p>{post.dive_number}</p>
							<p>{post.content}</p>
							<p>{post.bottom_time}</p>
							<p>{post.location}</p>
						</CardContent>
					</Card>
				);
			})}
		</article>
	);
}
export default Post;
