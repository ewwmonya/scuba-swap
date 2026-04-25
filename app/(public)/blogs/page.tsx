import { TrendingLandingPageCard } from '@/components/trending/TrendingLandingPageCard';

import Image from 'next/image';
import trending from '@/public/trending.jpg';
import gear from '@/lib/gearPosts/trending-gear.json';

function page() {
	return (
		<main className='mt-8 min-h-screen'>
			<Image
				loading='eager'
				src={trending}
				alt='best scuba gear for beginner, best dive gear 2026, top scuba gear right now, scuba gear recommendations, best scuba setup for beginners'
			/>
			<h1 className='text-primary text-3xl font-extrabold my-12'>Trending </h1>

			<div className='mb-30 gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full mx-auto'>
				{gear.map((i) => {
					return <TrendingLandingPageCard key={i.title} gear={i} />;
				})}
			</div>
		</main>
	);
}
export default page;
