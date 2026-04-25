import { GearType } from './TrendingHero';

export default function GearProsCons({ gear }: { gear: GearType }) {
	return (
		<section className='mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2'>
			<ListCard title='Pros' items={gear.pros} type='pros' />
			<ListCard title='Cons' items={gear.cons} type='cons' />
		</section>
	);
}

function ListCard({
	title,
	items,
	type,
}: {
	title: string;
	items: string[];
	type: string;
}) {
	const bg = type === 'pros' ? 'bg-sky-50' : 'bg-rose-50';

	return (
		<div className={`rounded-xl p-6 ${bg}`}>
			<h2 className='mb-4 font-semibold'>{title}</h2>

			<ul className='space-y-3'>
				{items.map((item) => (
					<li key={item} className='text-sm text-slate-700'>
						• {item}
					</li>
				))}
			</ul>
		</div>
	);
}
