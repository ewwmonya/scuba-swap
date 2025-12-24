export const dynamic = 'force-dynamic';
import PageTitle from '@/components/globals/PageTitle';
import Post from '@/components/posts-divelog/Post';
import { PostFilter } from '@/components/posts-divelog/PostFilter';
import PostAvatar from '@/components/posts-divelog/PostAvatar';
import PostDrawer from '@/components/posts-divelog/PostDrawer';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
const published = false;

function page() {
	if (published) {
		return (
			<main className='mt-12'>
				<PageTitle text='Dive Log Feed' textColor='text-slate-800' />
				<p className='text-medium-gray text-base font-normal leading-normal'>
					Share and discover amazing dive sites from around the world.
				</p>
				<section className='grid grid-cols-1 lg:grid-cols-3 w-[85vw] max-w-[1170px] gap-8 mx-auto'>
					<div className='col-span-2'>
						<div className='my-10'>
							<div className='grid gap-4'>
								<div className='lg:hidden block w-full'>
									{/* <PostFilter /> */}
								</div>
								<Card>
									<div className='flex gap-4 justify-between items-center'>
										<CardHeader className='text-gray-900 tracking-wide '>
											<PostAvatar src='https://github.com/shadcn.png' />
										</CardHeader>
										<CardContent>
											<CardAction className=' flex justify-end '>
												<PostDrawer />
											</CardAction>
										</CardContent>
									</div>
								</Card>
							</div>

							<Post />
						</div>
					</div>
					<div className='lg:block hidden my-10'>{/* <PostFilter /> */}</div>
				</section>
			</main>
		);
	} else
		return <main className='min-h-[85vh] p-8 text-2xl'>Coming Soon...</main>;
}
export default page;
