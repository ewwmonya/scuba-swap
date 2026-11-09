'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	BookOpen,
	Compass,
	LifeBuoy,
	MapPin,
	MessageCircle,
	ShieldCheck,
} from 'lucide-react';
import { Button } from '../ui/button';

const exploreLinks = [
	{ href: '/feed', label: 'Dive Log Feed', icon: Compass },
	{ href: '/forum', label: 'Community Forum', icon: MessageCircle },
	{ href: '/blogs', label: 'Dive Gear Blogs', icon: BookOpen },
];

export default function FeedSidebar() {
	const pathname = usePathname();
	return (
		<aside
			aria-label='Feed sidebar'
			className='hidden w-full space-y-19 lg:block bg-slate-50 p-4'
		>
			<section className='px-4'>
				<h2 className='mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500'>
					Explore {pathname}
				</h2>
				<nav aria-label='Explore ScubaSwap' className='space-y-4'>
					{exploreLinks.map(({ href, label, icon: Icon }) => (
						<Button
							key={href}
							asChild
							className={`${pathname !== href ? 'bg-blue-900 text-white text-md' : 'bg-sky-100 text-blue-900 text-xl tracking-wide'}  
								 w-full text-left px-3 py-6  rounded-lg 
								  font-medium  transition-colors hover:bg-sky-50
								hover:text-sky-900 focus-visible:outline
								focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
						>
							<Link
								href={href}
								className='flex items-center gap-3 justify-start'
							>
								<Icon aria-hidden='true' className='h-4 w-4' />
								{label}
							</Link>
						</Button>
					))}
				</nav>
			</section>
			<div className='self-bottom'>
				<section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
					<div className='mb-3 flex items-center gap-2 text-slate-900'>
						<LifeBuoy aria-hidden='true' className='h-5 w-5 text-sky-700' />
						<h2 className='font-semibold'>Our Community</h2>
					</div>
					<p className='text-sm leading-6 text-slate-600'>
						Share dive logs, ask questions, and connect with divers who love
						exploring underwater.
					</p>
					<Link
						href='/forum'
						className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:underline'
					>
						<MessageCircle aria-hidden='true' className='h-4 w-4' />
						Visit the forum
					</Link>
				</section>

				<section className='rounded-2xl border border-sky-100 bg-sky-50 p-5'>
					<div className='mb-2 flex items-center gap-2 text-sky-900'>
						<ShieldCheck aria-hidden='true' className='h-5 w-5' />
						<h2 className='font-semibold'>Dive Tip</h2>
					</div>
					<p className='text-sm leading-6 text-sky-950/80'>
						Plan your dive, dive your plan, and always stay within your training
						and limits..
					</p>
				</section>
			</div>
		</aside>
	);
}
