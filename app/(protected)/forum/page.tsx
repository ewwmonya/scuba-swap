import { ForumFeed } from './../../../components/forum/ForumFeed';
export const dynamic = 'force-dynamic';
import { SubmitForum } from './../../../components/forum/SubmitForum';
import PageTitle from '@/components/globals/PageTitle';

import { PostFilter } from '@/components/posts-divelog/PostFilter';

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
			<section className='grid grid-cols-1 lg:grid-cols-3 w-[85vw] max-w-[1170px] gap-8 mx-auto '>
				<div className='col-span-2 w-full'>
					<div className='block lg:hidden my-10'>
						<PostFilter />
					</div>
					<SubmitForum />
					<ForumFeed />
				</div>
				<div className='lg:block hidden my-10'>
					<PostFilter />
				</div>
			</section>
		</main>
	);
}
export default page;
