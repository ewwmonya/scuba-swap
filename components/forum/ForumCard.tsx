import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import { MdRemoveRedEye } from 'react-icons/md';
import { MdOutlineMessage } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostAvatar from '@/components/posts-divelog/PostAvatar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prismaActions';
type UserDataType = {
	id: string;
	email: string;
	createdAt: Date;
	username: string;
	uuID_auth: string;
};
dayjs.extend(relativeTime);
const getuser = async (uID: string): Promise<UserDataType | null> => {
	try {
		const data = await prisma.user.findFirst({
			where: {
				id: uID,
			},
		});
		return data || null;
	} catch (error) {
		return null;
	}
};
async function ForumCard({
	longDes = false,
	data,
}: {
	data: {
		caption?: string;
		id: string;
		content: string;
		createdAt: Date;
		userId: string;
	};
	longDes?: boolean;
}) {
	const userData = await getuser(data?.userId);
	const time = dayjs(data.createdAt).fromNow();
	return (
		<div className='flex w-full flex-col gap-6 my-4 overflow-hidden'>
			<Item variant='outline' className=' bg-white'>
				<ItemContent>
					<div className='flex gap-4'>
						{userData && <PostAvatar name={userData.username} />}
						{userData && (
							<ItemTitle className='font-bold'>{userData.username}</ItemTitle>
						)}
					</div>
					{data?.caption && <ItemTitle className=''>{data?.caption}</ItemTitle>}

					{time && (
						<ItemTitle className='tracking-widest text-xm text-gray-400'>
							{time}
						</ItemTitle>
					)}
					{longDes == false ?
						<ItemDescription className='mx-2 leading-normal line-clamp-4'>
							{data?.content}
						</ItemDescription>
					:	<ItemDescription className='mx-2 leading-8'>
							{data?.content}
						</ItemDescription>
					}
				</ItemContent>
				<ItemActions>
					<div className='flex gap-4 justify-between'>
						{/* <p className='  text-md text-slate-800'>
							<MdRemoveRedEye />
							<span>3k</span>
						</p>
						<p className='  text-md text-slate-800'>
							<MdOutlineMessage />
							<span>30</span>
						</p> */}
					</div>
				</ItemActions>
			</Item>
		</div>
	);
}
export default ForumCard;
