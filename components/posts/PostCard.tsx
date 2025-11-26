import { MdOutlineMessage } from 'react-icons/md';
import { MdThumbUpOffAlt } from 'react-icons/md';
import { MdIosShare } from 'react-icons/md';
import PostAvatar from './PostAvatar';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { IoMdPin } from 'react-icons/io';
import Image from 'next/image';
import { Button } from '../ui/button';

type PostType = {
	id: string;
	user: {
		name: string;
		avatar: string;
	};
	image: string;
	caption: string;
	likes: number;
	location: string;
	comments: {
		id: string;
		user: string;
		text: string;
	}[];
	category: string;
	createdAt: string;
};

function PostCard({ post }: { post: PostType }) {
	return (
		<>
			<Card className='my-4'>
				<CardHeader>
					<CardTitle className=' grid gap-4 grid-cols-2'>
						<div className='flex align-middle gap-4'>
							<PostAvatar src={post.user.avatar} />
							<div className='grid'>
								<p>{post.user.name}</p>
								<p className='font-light'>{post.createdAt}</p>
							</div>
						</div>
					</CardTitle>
					<CardDescription className='flex align-bottom my-2'>
						<IoMdPin className='text-lg text-primary' />
						<p className='font-light tracking-wide'>{post.location}</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					{post.image ? (
						<Image
							src={post.image}
							width={762}
							height={325}
							alt={post.caption}
						/>
					) : (
						''
					)}
					<p className='max-w-lg my-4 tracking-wide leading-6 font-bold text-lg text-slate-800'>
						{post.caption}
					</p>
				</CardContent>
				<CardFooter>
					<CardAction className='flex justify-between w-full'>
						<Button variant={'link'}>
							<MdThumbUpOffAlt /> Like
						</Button>
						<Button variant={'link'}>
							<MdOutlineMessage /> Comments
						</Button>
						<Button variant={'link'}>
							<MdIosShare /> Share
						</Button>
					</CardAction>
				</CardFooter>
			</Card>
		</>
	);
}
export default PostCard;
