'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	BookOpen,
	Compass,
	Fish,
	LifeBuoy,
	MapPin,
	MessageCircle,
	ShieldCheck,
	Waves,
} from 'lucide-react';

const exploreLinks = [
	{ href: '/feed', label: 'Dive Log Feed', icon: Compass },
	{ href: '/forum', label: 'Community Forum', icon: MessageCircle },
	{ href: '/blogs', label: 'Dive Gear Blogs', icon: BookOpen },
];

const discoverItems = [
	{ label: 'Dive Sites Map', icon: MapPin },
	{ label: 'Marine Species Guide', icon: Fish },
	{ label: 'Group Excursions', icon: Waves },
];

const rowClass = 'flex items-center gap-4 rounded-xl px-4 py-2';
const labelClass =
	'px-4 font-[family-name:var(--font-scuba-heading)] text-[11px] leading-[14px] font-semibold tracking-[0.05em] text-[#3f4850] uppercase';

export default function FeedSidebar() {
	const pathname = usePathname();

	return (
		<aside
			aria-label='Feed sidebar'
			className='sticky top-16 hidden h-[calc(100dvh-4rem)] flex-col justify-between overflow-y-auto border-r border-[#e2e8f0] bg-white/80 p-4 font-[family-name:var(--font-scuba-body)] text-[#131b2e] backdrop-blur-lg xl:flex'
		>
			<div className='flex flex-col gap-6'>
				<nav aria-label='Explore ScubaSwap' className='flex flex-col gap-1'>
					<h2 className={labelClass}>Explore</h2>
					{exploreLinks.map(({ href, label, icon: Icon }) => {
						const isCurrentPage = pathname === href;
						const isActive = isCurrentPage || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={href}
								href={href}
								aria-current={isCurrentPage ? 'page' : isActive ? 'location' : undefined}
								className={`${rowClass} transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006194] ${
									isActive
										? 'bg-[#cce5ff] text-base leading-6 font-semibold text-[#004b73]'
										: 'text-sm leading-[22px] text-[#3f4850] hover:bg-[#f1f5f9] hover:text-[#131b2e]'
								}`}
							>
								<Icon aria-hidden='true' className='size-5 shrink-0' />
								{label}
							</Link>
						);
					})}
				</nav>

				<section className='flex flex-col gap-1'>
					<h2 className={labelClass}>Discover</h2>
					<ul className='flex flex-col gap-1'>
						{discoverItems.map(({ label, icon: Icon }) => (
							<li key={label} className={`${rowClass} text-sm leading-[22px] text-[#3f4850]`}>
								<Icon aria-hidden='true' className='size-5 shrink-0' />
								{label}
								<span className='sr-only'> (coming soon)</span>
							</li>
						))}
					</ul>
				</section>
			</div>

			<div className='flex flex-col gap-4 pt-6'>
				<section className='rounded-xl border border-[#e2e8f0] bg-white p-4'>
					<h2 className='mb-1 flex items-center gap-1 font-[family-name:var(--font-scuba-heading)] text-[11px] leading-[14px] font-semibold tracking-[0.05em] text-[#006780] uppercase'>
						<LifeBuoy aria-hidden='true' className='size-[18px]' />
						Community Hub
					</h2>
					<p className='text-xs leading-[18px] text-[#3f4850]'>
						Share dive logs, discover dive sites, and connect with other divers.
					</p>
				</section>

				<section className='rounded-xl border border-[#e2e8f0] bg-[#f1f5f9] p-4'>
					<h2 className='mb-1 flex items-center gap-1 font-[family-name:var(--font-scuba-heading)] text-[11px] leading-[14px] font-semibold tracking-[0.05em] text-[#006194] uppercase'>
						<ShieldCheck aria-hidden='true' className='size-[18px]' />
						NDL Safety Rule
					</h2>
					<p className='text-xs leading-[18px] text-[#3f4850]'>
						Plan your dive, dive your plan, and stay within your no-decompression limits.
					</p>
				</section>
			</div>
		</aside>
	);
}
