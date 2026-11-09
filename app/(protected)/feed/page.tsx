import Post from '@/components/posts-divelog/Post';
import PostDrawer from '@/components/posts-divelog/PostDrawer';
import { PostFilter } from '@/components/posts-divelog/PostFilter';

export const dynamic = 'force-dynamic';

export default function FeedPage() {
	return (
		<div className='min-h-lvh space-y-6 pb-8'>
			<header className='flex flex-wrap items-end justify-between gap-4'>
				<div>
					<h1 className='font-[family-name:var(--font-scuba-heading)] text-2xl font-bold text-slate-900 sm:text-4xl'>
						Dive Log Feed
					</h1>
					<p className='mt-1 text-sm text-slate-600'>
						Share and discover amazing dive sites from around the world.
					</p>
				</div>
				<PostDrawer />
			</header>
			<div className='grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
				<Post />
				<aside aria-label='Feed filters' className='hidden xl:block'>
					<PostFilter />
				</aside>
			</div>
		</div>
	);
}
