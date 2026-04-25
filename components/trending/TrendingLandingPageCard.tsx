import Image, { StaticImageData } from 'next/image';
import { Card, CardAction } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { GearType } from './TrendingHero';

export function TrendingLandingPageCard({ gear }: { gear: GearType }) {
	const slug = gear.name.replaceAll(' ', '-').toLowerCase();
	console.log(slug);
	return (
		<Card>
			<Link href={`/blogs/${slug}`}>
				<section className='grid-cols-1 grid md:grid-cols-2'>
					<div className='px-2 py-6'>
						<Image alt='asdas' src={gear.image} width={500} height={400} />
					</div>
					<div>
						<TrendingLandingPageCardInfo gear={gear} />
						<TrendingLandingPageAction
							slug={slug}
							affiliateUrl={gear.affiliateUrl}
						/>
					</div>
				</section>
			</Link>
		</Card>
	);
}

function TrendingLandingPageCardInfo({ gear }: { gear: GearType }) {
	return (
		<div className='py-8 px-4'>
			<h2 className='text-lg md:text-2xl font-semibold py-2'>{gear.name}</h2>
			<div className='mb-4 flex gap-2'>
				<span className='rounded-full bg-blue-900 px-3 py-1 text-xs uppercase text-white'>
					{gear.category}
				</span>
				<span className='rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-900'>
					{gear.badge}
				</span>
			</div>
			<p>{gear.summary}</p>
		</div>
	);
}

function TrendingLandingPageAction({
	slug,
	affiliateUrl,
}: {
	slug: string;
	affiliateUrl: string;
}) {
	return (
		<CardAction className='p-4 gap-4 flex'>
			<Button
				asChild
				variant={'outline'}
				className='hover:bg-orange-500 hover:text-white'
			>
				<Link href={`/blogs/${slug}`}>Read More</Link>
			</Button>
			<Button asChild className='bg-sky-950'>
				<Link href={affiliateUrl}>Buy This Now!</Link>
			</Button>
		</CardAction>
	);
}

export default TrendingLandingPageCard;
