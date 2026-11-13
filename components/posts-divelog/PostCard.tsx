import {
	ArrowDown,
	Clock3,
	Eye,
	Gauge,
	Hash,
	Heart,
	MapPin,
	MessageCircle,
	Thermometer,
	Waves,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DiveCardData } from '@/lib/diveCards';
import { DiverAvatar, diveImageSource } from './DiverAvatar';
import { LikeBtn } from './LikeBtn';
import { ShareDive } from './ShareDive';

const diveDateFormat = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
	timeZone: 'UTC',
});
const labelClass =
	'font-[family-name:var(--font-scuba-heading)] text-[11px] leading-[14px] font-semibold tracking-[0.05em] uppercase';

export default function PostCard({
	dive,
	viewerId,
	children,
}: {
	dive: DiveCardData;
	viewerId?: string;
	children?: ReactNode;
}) {
	const href = `/feed/${dive.id}`;
	const username = dive.user.username;
	const photo = diveImageSource(dive.dive_image_url);
	const water = dive.water_temperature_surface?.trim();
	const current = dive.currents_conditions?.trim();
	const visibility = dive.visibility;
	const start = dive.air_consumption_start_psi_bar;
	const end = dive.air_consumption_end_psi_bar;
	const pressure =
		start != null && end != null ? `${start} → ${end}` : (start ?? end);
	const metrics = [
		{
			label: 'Max depth',
			icon: ArrowDown,
			value: dive.maximum_depth,
			unit: 'ft',
		},
		{
			label: 'Bottom time',
			icon: Clock3,
			value: dive.bottom_time?.trim(),
			unit: 'min',
		},
		{
			label: 'Tank pressure',
			icon: Gauge,
			value: pressure,
			unit:
				start != null && end == null ? 'start'
				: start == null && end != null ? 'end'
				: undefined,
		},
		{ label: 'Dive number', icon: Hash, value: dive.dive_number },
	].filter(({ value }) => value != null && value !== '');
	const gear = [
		{ label: 'Exposure suit', value: dive.equipment_exposure_suit?.trim() },
		{ label: 'Tank', value: dive.equipment_tank_type_size?.trim() },
		{ label: 'Additional gear', value: dive.equipment_additional?.trim() },
	].filter(({ value }) => value);
	const conditions = [
		{
			label: 'Water',
			icon: Thermometer,
			value: water && (/^\d+(\.\d+)?$/.test(water) ? `${water}°F` : water),
		},
		{ label: 'Visibility', icon: Eye, value: visibility },
		{ label: 'Current', icon: Waves, value: current },
	].filter(({ value }) => value != null && value !== '');
	console.log(dive.user.avatar?.url);
	return (
		<article
			aria-label={`Dive ${dive.dive_number} at ${dive.location}`}
			className='@container min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white font-[family-name:var(--font-scuba-body)] text-slate-900 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04),0_2px_6px_-1px_rgba(2,132,199,0.03)]'
		>
			<header className='flex items-center justify-between gap-3 p-4'>
				<div className='flex min-w-0 items-center gap-3'>
					<DiverAvatar username={username} url={dive.user.avatar?.url} />
					<div className='min-w-0'>
						<div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'>
							<p className='min-w-0 font-semibold break-all'>@{username}</p>
							<time
								dateTime={dive.dive_date.toISOString().slice(0, 10)}
								className='text-xs text-slate-600'
							>
								{diveDateFormat.format(dive.dive_date)}
							</time>
						</div>
						<p className='mt-0.5 flex items-start gap-1 text-xs text-slate-600'>
							<MapPin
								aria-hidden='true'
								className='size-4 shrink-0 text-sky-700'
							/>
							<span className='min-w-0 wrap-anywhere'>{dive.location}</span>
						</p>
					</div>
				</div>
				{!children && (
					<Link
						href={href}
						className='shrink-0 rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 hover:bg-sky-100'
					>
						View log
					</Link>
				)}
			</header>

			{photo && (
				<div className='relative aspect-[4/3] w-full overflow-hidden bg-slate-100'>
					<Image
						src={photo}
						alt={`Dive photo from ${dive.location}`}
						fill
						unoptimized
						sizes='(min-width: 1280px) 720px, 100vw'
						className='object-cover'
					/>
					<span
						className={`absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-sky-800 shadow-sm backdrop-blur-md sm:top-4 sm:left-4 ${labelClass}`}
					>
						Dive log · #{dive.dive_number}
					</span>
					{conditions.length > 0 && (
						<div className='absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4'>
							<Conditions conditions={conditions} />
						</div>
					)}
				</div>
			)}

			<section className='space-y-3 border-t border-slate-100 p-4'>
				<h2
					className={`flex items-center gap-1.5 text-slate-600 ${labelClass}`}
				>
					<Gauge aria-hidden='true' className='size-4 text-sky-700' />
					Dive telemetry
				</h2>
				<dl className='grid grid-cols-2 gap-2 @xl:grid-cols-4'>
					{metrics.map(({ label, icon: Icon, value, unit }) => (
						<div
							key={label}
							className='min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3'
						>
							<dt
								className={`flex items-start justify-between gap-1 text-slate-600 ${labelClass}`}
							>
								{label}
								<Icon
									aria-hidden='true'
									className='size-4 shrink-0 text-sky-700'
								/>
							</dt>
							<dd className='mt-1 flex flex-wrap items-baseline gap-x-1 font-[family-name:var(--font-scuba-heading)] text-xl leading-tight font-bold tabular-nums'>
								<span className='min-w-0 wrap-anywhere'>{value}</span>
								{unit && (
									<span className='text-xs font-normal text-slate-600'>
										{unit}
									</span>
								)}
							</dd>
						</div>
					))}
				</dl>
				{!photo && conditions.length > 0 && (
					<Conditions conditions={conditions} />
				)}
				{(dive.entry_time || dive.exit_time) && (
					<dl className='flex flex-wrap gap-x-5 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs'>
						{dive.entry_time && (
							<div className='flex gap-2'>
								<dt className='text-slate-600'>Entry</dt>
								<dd className='font-semibold tabular-nums'>
									{dive.entry_time}
								</dd>
							</div>
						)}
						{dive.exit_time && (
							<div className='flex gap-2'>
								<dt className='text-slate-600'>Exit</dt>
								<dd className='font-semibold tabular-nums'>{dive.exit_time}</dd>
							</div>
						)}
					</dl>
				)}
				{gear.length > 0 && (
					<div className='flex flex-wrap items-center gap-1.5 text-xs'>
						<span className={`text-slate-600 ${labelClass}`}>Gear</span>
						{gear.map(({ label, value }) => (
							<span
								key={label}
								className='max-w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 wrap-anywhere'
							>
								{label}: {value}
							</span>
						))}
					</div>
				)}
			</section>

			<div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-slate-100 bg-slate-50/80 px-3 py-1'>
				<div className='flex flex-wrap items-center gap-1'>
					{viewerId ?
						<LikeBtn
							postId={dive.id}
							initialCount={dive._count.likes}
							initiallyLiked={dive.likes.length > 0}
							currentUserId={viewerId}
						/>
					:	<span className='inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-slate-700'>
							<Heart aria-hidden='true' className='size-5' />
							{dive._count.likes} {dive._count.likes === 1 ? 'like' : 'likes'}
						</span>
					}
					<Link
						href={children ? '#dive-comments' : `${href}#dive-comments`}
						aria-label={`${dive._count.comments} ${dive._count.comments === 1 ? 'comment' : 'comments'}`}
						className='inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold tabular-nums text-slate-700 hover:bg-sky-50 hover:text-sky-700'
					>
						<MessageCircle aria-hidden='true' className='size-5' />
						{dive._count.comments}
					</Link>
					<ShareDive href={href} />
				</div>
				{dive.buddy_instructor?.trim() && (
					<p className='max-w-full px-2 py-2 text-xs wrap-anywhere text-slate-600'>
						Dive buddy or instructor{' '}
						<span className='font-semibold text-sky-800'>
							{dive.buddy_instructor}
						</span>
					</p>
				)}
			</div>

			{dive.content.trim() && (
				<p className='border-t border-slate-100 p-4 text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap text-slate-700'>
					<span className='mr-1 font-semibold text-slate-900'>@{username}</span>
					<br />
					{dive.content}
				</p>
			)}
			{children}
		</article>
	);
}

function Conditions({
	conditions,
}: {
	conditions: {
		label: string;
		icon: typeof Thermometer;
		value: string | number | null | undefined;
	}[];
}) {
	return (
		<dl className='flex flex-wrap gap-x-4 gap-y-1 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-sm backdrop-blur-md'>
			{conditions.map(({ label, icon: Icon, value }) => (
				<div key={label} className='flex min-w-0 items-center gap-1.5'>
					<Icon aria-hidden='true' className='size-4 shrink-0 text-sky-700' />
					<dt className='text-slate-600'>{label}</dt>
					<dd className='min-w-0 font-semibold wrap-anywhere tabular-nums'>
						{value}
					</dd>
				</div>
			))}
		</dl>
	);
}
