import PostCard from './PostCard';
import PostAvatar from './PostAvatar';
import { mockPosts } from '../../lib/posts';
import { Card, CardAction, CardContent, CardFooter } from '../ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { MdForum } from 'react-icons/md';
import { IoMdImages } from 'react-icons/io';

function Post() {
	return (
		<article>
			{/* input */}
			<Card>
				<CardContent>
					<div className='flex gap-4'>
						<PostAvatar src='https://github.com/shadcn.png' />
						<Textarea
							className='resize-none h-30'
							placeholder='Type your message here.'
						/>
					</div>
				</CardContent>
				<CardFooter>
					<CardAction className=' flex justify-between w-full'>
						<div className='ml-12 flex-2'>
							<Button variant={'ghost'} className='hover:bg-orange-100' asChild>
								<div className='flex '>
									<MdForum />
									<p>Forum</p>
								</div>
							</Button>
							<Button variant={'ghost'} className='hover:bg-orange-100' asChild>
								<div className='flex '>
									<IoMdImages />
									<p>Add Image</p>
								</div>
							</Button>
						</div>
						<Button>Post</Button>
					</CardAction>
				</CardFooter>
			</Card>
			{mockPosts.map((post) => {
				return <PostCard key={post.id} post={post} />;
			})}
		</article>
	);
}
export default Post;
