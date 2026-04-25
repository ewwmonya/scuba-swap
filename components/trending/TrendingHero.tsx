import Image from 'next/image';
import Link from 'next/link';

export type GearType = {
	name: string;
	category: string;
	badge: string;
	summary: string;
	priceRange: string;
	image: string;
	affiliateUrl: string;
	bestFor: string;
	skillLevel: string;
	keyStrength: string;
	title: string;
	body: string[];
	pros: string[];
	cons: string[];
	specs: {
		label: string;
		value: string;
	}[];
	lifestyleImage: string;
};
export function TrendingHero({ gear }: { gear: GearType }) {
	return (
		<section className='mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2'>
			<div className='overflow-hidden rounded-xl bg-white shadow'>
				<Image
					width={700}
					height={600}
					src={gear.image}
					alt={gear.name}
					className='h-full w-full object-cover'
				/>
			</div>

			<div className='flex flex-col justify-center'>
				<div className='mb-4 flex gap-2'>
					<span className='rounded-full bg-blue-900 px-3 py-1 text-xs uppercase text-white'>
						{gear.category}
					</span>

					{gear.badge && (
						<span className='rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-900'>
							{gear.badge}
						</span>
					)}
				</div>

				<h1 className='text-4xl font-bold text-slate-950'>{gear.name}</h1>

				<p className='mt-4 max-w-xl text-slate-600'>{gear.summary}</p>

				<p className='mt-5 text-2xl font-semibold'>{gear.priceRange}</p>

				<div className='mt-6 flex gap-4'>
					<Link
						href={gear.affiliateUrl}
						target='_blank'
						rel='noopener noreferrer sponsored'
						className='rounded-md bg-sky-950 px-5 py-3 text-sm font-semibold text-white'
					>
						Check Current Price
					</Link>

					<Link
						href={gear.affiliateUrl}
						target='_blank'
						rel='noopener noreferrer sponsored'
						className='rounded-md border px-5 py-3 text-sm font-semibold'
					>
						View on Retailer
					</Link>
				</div>
			</div>
		</section>
	);
}
