import { GearType } from './TrendingHero';

export default function GearSpecs({ gear }: { gear: GearType }) {
	return (
		<section className='mx-auto max-w-6xl px-6 py-10'>
			<h2 className='mb-8 text-center text-2xl font-semibold'>
				Technical Specifications
			</h2>

			<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
				{gear.specs.map((spec) => (
					<div key={spec.label} className='rounded-lg border bg-white p-5'>
						<p className='text-xs uppercase text-slate-500'>{spec.label}</p>
						<p className='mt-2 text-sm font-medium'>{spec.value}</p>
					</div>
				))}
			</div>
		</section>
	);
}
