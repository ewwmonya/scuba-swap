import GearProsCons from '@/components/trending/GearProsCons';
import GearQuickStats from '@/components/trending/GearQuickStats';
import GearSpecs from '@/components/trending/GearSpecs';
import { GearType, TrendingHero } from '@/components/trending/TrendingHero';
import gear from '@/lib/gearPosts/trending-gear.json';

export default async function TrendingGearPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resp = await params;
	const data = resp.slug.replaceAll('-', ' ');
	const currentGear = gear.find((i) => i.name.toLowerCase() == data);
	console.log(data);
	console.log(currentGear);
	// 🔌 You’ll replace this with your real fetch
	// const gear = await getTrendingGear()
	const mockGear = {
		name: 'Suunto D5 Dive Computer',
		category: 'Dive Computer',
		badge: 'Editor’s Choice',
		summary:
			'A seamless blend of high-performance technical specs and everyday style.',
		priceRange: '$600 - $800',
		image: 'https://picsum.photos/600/400?random=3',
		affiliateUrl: 'https://retailer-link.com',

		bestFor: 'Travel Divers',
		skillLevel: 'Recreational',
		keyStrength: 'Vibrant Screen',

		title: 'Built for the Deep, Styled for the Shore',
		body: [
			'The Suunto D5 represents a significant shift in dive computer design...',
			'What truly sets the D5 apart is its lifestyle integration...',
		],

		pros: [
			'Reliable wireless tank pressure integration',
			'Stunning full-color high-resolution display',
			'Vibration alarms for subtle underwater alerts',
		],

		cons: [
			'Battery life could be longer',
			'Proprietary magnetic charging cable is easy to lose',
		],

		specs: [
			{ label: 'Max Depth', value: '100m / 328ft' },
			{ label: 'Battery', value: 'Rechargeable Li-ion' },
			{ label: 'Display', value: 'MIP Full Color' },
			{ label: 'Weight', value: '90g / 3.17oz' },
		],

		lifestyleImage: '/images/diver-watch.jpg',
	};
	if (currentGear)
		return (
			<main>
				<TrendingHero gear={currentGear} />
				<GearQuickStats gear={currentGear} />
				<GearProsCons gear={currentGear} />
				<GearSpecs gear={currentGear} />
			</main>
		);
}
