import { Compass, HeartPulse, Camera, Wrench } from 'lucide-react';
import Link from 'next/link';

const chambers = [
	{
		title: 'Equipment Lab & Tech',
		description:
			'Gear, regulators, dive computers, BCDs and equipment maintenance.',
		icon: Wrench,
		color: 'bg-sky-100 text-sky-800',
		slug: 'equipment-lab-tech',
	},
	{
		title: 'Regional & Travel',
		description:
			'Local dive sites, destinations, liveaboards and trip reports.',
		icon: Compass,
		color: 'bg-cyan-100 text-cyan-800',
		slug: 'regional-travel',
	},
	{
		title: 'Diving Medicine & Safety',
		description: 'Safety practices, training and diving physiology.',
		icon: HeartPulse,
		color: 'bg-rose-100 text-rose-800',
		slug: 'diving-medicine-safety',
	},
	{
		title: 'Underwater Photo & Video',
		description: 'Cameras, strobes, lighting and underwater photography.',
		icon: Camera,
		color: 'bg-indigo-100 text-indigo-800',
		slug: 'underwater-photo-video',
	},
];

export function ForumChambers() {
	return (
		<section aria-labelledby='chambers-heading' className='space-y-4'>
			<h2
				id='chambers-heading'
				className='px-1 text-xl font-bold text-slate-900'
			>
				Explore Forum Chambers
			</h2>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
				{chambers.map(({ title, description, icon: Icon, color, slug }) => (
					<article
						key={title}
						className='flex gap-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-100 hover:border-cyan-300 p-5 shadow-sm'
					>
						<Link href={`/forum/category/${slug}`} className='p-0 m-0'>
							<div
								className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
							>
								<Icon size={24} />
							</div>
							<div>
								<h3 className='font-bold text-sky-950'>{title}</h3>
								<p className='mt-1 text-sm leading-relaxed text-slate-600'>
									{description}
								</p>
							</div>
						</Link>
					</article>
				))}
			</div>
		</section>
	);
}
