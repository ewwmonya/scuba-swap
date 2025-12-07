import PageTitle from '@/components/globals/PageTitle';

import { mockPosts } from '../../../lib/posts';
import ForumCard from '@/components/forum/ForumCard';
import { PostFilter } from '@/components/posts/PostFilter';
import PostAvatar from '../../../components/posts/PostAvatar';
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MdForum } from 'react-icons/md';
import { IoMdImages } from 'react-icons/io';
import { Button } from '@/components/ui/button';
function page() {
	return (
		<main className='mt-12'>
			<PageTitle
				text='Dive Community Forum and Issues'
				textColor='text-slate-800'
			/>
			<p className='text-medium-gray text-base font-normal leading-normal'>
				Talk new gear and issues your are facing.
			</p>
			<section className='grid grid-cols-1 lg:grid-cols-3 w-[85vw] max-w-[1170px] gap-8 mx-auto'>
				<div className='col-span-2 w-full'>
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
									<Button
										variant={'ghost'}
										className='hover:bg-orange-100'
										asChild
									>
										<div className='flex '>
											<MdForum />
											<p>Forum</p>
										</div>
									</Button>
									<Button
										variant={'ghost'}
										className='hover:bg-orange-100'
										asChild
									>
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
					<div className='my-10'>
						{mockPosts.map((p) => {
							return <ForumCard key={p.id} data={p} />;
						})}
					</div>
				</div>
				<div className='block my-10'>
					<PostFilter />
				</div>
			</section>
		</main>
	);
}
export default page;
