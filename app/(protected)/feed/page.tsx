import PageTitle from '@/components/globals/PageTitle';
import Post from '@/components/posts/Post';
import { PostFilter } from '@/components/posts/PostFilter';

function page() {
	return (
		<main className='mt-12'>
			<PageTitle text='Dive Log Feed' textColor='text-slate-800' />
			<p className='text-medium-gray text-base font-normal leading-normal'>
				Share and discover amazing dive sites from around the world.
			</p>
			<section className='grid grid-cols-1 lg:grid-cols-3 w-[85vw]  gap-8 mx-auto'>
				<div className='col-span-2'>
					<div className='my-10'>
						<Post />
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
