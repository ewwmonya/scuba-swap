import { GearType } from './TrendingHero';

export default function GearQuickStats({ gear }: { gear: GearType }) {
	return (
		<section className='mx-auto max-w-6xl px-6'>
			<div className='grid overflow-hidden rounded-xl border bg-white shadow-sm md:grid-cols-3'>
				<Stat label='Best For' value={gear.bestFor} />
				<Stat label='Skill Level' value={gear.skillLevel} />
				<Stat label='Key Strength' value={gear.keyStrength} />
			</div>
		</section>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className='border-b p-8 text-center md:border-b-0 md:border-r last:border-r-0'>
			<p className='text-xs uppercase text-slate-500'>{label}</p>
			<p className='mt-2 font-medium text-slate-900'>{value}</p>
		</div>
	);
}
