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

export type PostType = {
	id: string;
	createdAt?: Date | null;
	dive_number: number;
	dive_date: Date;
	entry_time: string;
	exit_time: string;
	location: string;
	buddy_instructor: string | null;
	maximum_depth: number | null;
	bottom_time: string | null;
	air_consumption_start_psi_bar: number | null;
	air_consumption_end_psi_bar: number | null;
	average_depth: string | null;
	surface_interval: string | null;
	water_temperature_surface: string | null;
	water_temperature_depth: number | null;
	visibility: number | null;
	currents_conditions: string | null;
	equipment_exposure_suit: string | null;
	equipment_tank_type_size: string | null;
	equipment_additional: string | null;
	userId: string;
	content: string;
};

function PostCard({ post }: { post: PostType }) {
	return (
		<>
			<Card className='my-4'>
				<CardHeader>
					<CardTitle className=' grid gap-4 grid-cols-2'>
						<div className='flex align-middle gap-4'>
							{/* <PostAvatar src={post.user.avatar} /> */}
							<div className='grid'>
								<p>{post.userId}</p>
								<p className='font-light'>post.createdAt</p>
							</div>
						</div>
					</CardTitle>
					<CardDescription className='flex align-bottom my-2'>
						<IoMdPin className='text-lg text-primary' />
						<p className='font-light tracking-wide'>{post.location}</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className='max-w-lg my-4 tracking-wide leading-6 font-bold text-lg text-slate-800'>
						{post?.caption ? post?.caption : <>post.caption</>}
					</p>

					{post.content ? (
						<p>{post.content}</p>
					) : (
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde esse
							veniam harum blanditiis vel amet quibusdam minus repellat velit
							quo.
						</p>
					)}
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
