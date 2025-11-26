import PageTitle from '@/components/globals/PageTitle';

import { mockPosts } from '../../../lib/posts';
import ForumCard from '@/components/forum/ForumCard';
import { PostFilter } from '@/components/posts/PostFilter';
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
			<section className='grid grid-cols-1 lg:grid-cols-3 w-[85vw]  gap-8 mx-auto'>
				<div className='col-span-2 w-full'>
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
