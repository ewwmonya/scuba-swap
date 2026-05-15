import { LikeBtn } from './LikeBtn';
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
import { prisma } from '@/lib/prismaActions';
import TimeAgo from '../forum/TimeAgo';
import Link from 'next/link';

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
	caption?: string;
	likes?: [];
};

export type UserType = {
	id: string;
	email: string;
	username: string;
};

export type diveMetaType = {
	key: keyof PostType;
	label: string;
	unit?: string;
};

async function PostCard({
	post,
	currentUser,
}: {
	post: PostType;
	currentUser: UserType;
}) {
	const diveMeta: diveMetaType[] = [
		{ key: 'caption', label: 'Caption' },
		{ key: 'dive_number', label: 'Dive Number' },
		{ key: 'entry_time', label: 'Entry Time' },
		{ key: 'exit_time', label: 'Exit Time' },
		{ key: 'maximum_depth', label: 'Max Depth', unit: 'ft' },
		{ key: 'bottom_time', label: 'Bottom Time', unit: 'min' },
	];
	const caption = `Dive at ${post.location}, at Max Depth of ${post.maximum_depth}`;

	const time: Date | null | undefined = post?.createdAt;

	const userData = await prisma.user.findUnique({
		where: {
			id: post.userId,
		},
	});
	const diveLikes = await prisma.diveLike.findMany({
		where: {
			diveId: post.id,
		},
	});

	return (
		<section>
			<Card className='my-4'>
				<div className=''>
					<section className=' min-w-4xl:col-span-3 lg:border-r max-sm:border-b pb-8'>
						<CardHeader>
							<CardTitle className=' grid gap-4 grid-cols-2'>
								<div className='flex align-middle gap-4'>
									{/* <PostAvatar src={post.user.avatar} /> */}
									<div className='grid pl-1'>
										<p>{userData?.username}</p>
									</div>
								</div>
							</CardTitle>
							<CardDescription className=' flex align-bottom my-2'>
								<IoMdPin className=' text-lg text-primary' />
								<p className='font-light tracking-wide'>{post.location}</p>
							</CardDescription>
						</CardHeader>
						<CardHeader>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 pl-1'>
								{diveMeta.map((field) => {
									const value = post[field.key];
									if (!value) return null;
									return (
										<p key={field.key} className='text-gray-600 tracking-wide'>
											<span className='font-black'>{field.label}:</span>
											<br />
											<span className='font-mono'>
												{value as string} {field.unit ?? ''}
											</span>
										</p>
									);
								})}
							</div>
						</CardHeader>
					</section>
				</div>
				{/* <div className='h-96 w-full bg-gray-100 col-span-2 my-8 mx-auto'>
					<Image
						loading='lazy'
						width={1170}
						height={500}
						className='h-96 overflow-hidden'
						src={'https://images.unsplash.com/photo-1544551763-46a013bb70d5'}
						alt='foo foo'
					/>
				</div> */}
				<CardContent>
					<p className='max-w-lg my-4 tracking-wide leading-6 font-bold text-lg text-slate-800'>
						{caption.length > 0 ? caption : <>post.caption</>}
					</p>

					{post.content ?
						<p className=''>{post.content}</p>
					:	<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde esse
							veniam harum blanditiis vel amet quibusdam minus repellat velit
							quo.
						</p>
					}
				</CardContent>
				{/* card footer */}
				<CardFooter>
					<CardAction className='flex justify-between w-full'>
						{currentUser ?
							<LikeBtn
								postId={post.id}
								inintLikesCount={diveLikes.length}
								currentUserId={currentUser.id}
							/>
						:	''}
						<Button variant={'link'}>
							<MdOutlineMessage />{' '}
							<Link href={`/feed/${post.id}`}>Comments</Link>
						</Button>
						<Button variant={'link'}>
							<MdIosShare /> Share
						</Button>
					</CardAction>
				</CardFooter>
			</Card>
		</section>
	);
}
export default PostCard;
