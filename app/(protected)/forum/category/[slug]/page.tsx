import { ForumChambers } from '@/components/globals/ForumChambers';
export const dynamic = 'force-dynamic';

import {
	Activity,
	Compass,
	MessageCircle,
	Users,
	BookOpen,
} from 'lucide-react';
import { ForumFeed } from '@/components/forum/ForumFeed';
import { SubmitForum } from '@/components/forum/SubmitForum';
import { prisma } from '@/lib/prismaActions';

export default async function ForumCategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const categories = await prisma.category.findMany({
		// where: {
		//     slug:
		// }
		select: { id: true, name: true },
		orderBy: { name: 'asc' },
	});
	const currentCategory = await prisma.category.findFirst({
		where: {
			slug: slug,
		},
		select: { id: true, name: true },
		orderBy: { name: 'asc' },
	});
	const stats = await Promise.allSettled([
		prisma.post.count(),
		prisma.postComment.count(),
		prisma.user.count(),
	]);
	const metrics = [
		{
			title: 'Forum Threads',
			value:
				stats[0].status === 'fulfilled' ? stats[0].value.toLocaleString() : '—',
			icon: MessageCircle,
		},
		{
			title: 'Forum Replies',
			value:
				stats[1].status === 'fulfilled' ? stats[1].value.toLocaleString() : '—',
			icon: BookOpen,
		},
		{
			title: 'Registered Divers',
			value:
				stats[2].status === 'fulfilled' ?
					(stats[2].value + 40).toLocaleString()
				:	'—',
			icon: Users,
		},
	];

	// console.log(currentCategory);
	return (
		<main className='mx-auto w-full min-w-0 max-w-[1280px] py-5 sm:py-8'>
			<header className='mb-7 rounded-3xl bg-gradient-to-br from-[#063b58] via-[#075773] to-[#087e95] px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10'>
				<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200'>
					<Compass size={17} /> Scuba Traders Community
				</div>
				<h1 className='mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl'>
					Dive into {currentCategory?.name} conversation.
				</h1>
				<p className='mt-3 max-w-2xl text-sm leading-relaxed text-cyan-50 sm:text-base'>
					Talk gear, dive trips, photography, safety and everything happening
					beneath the surface.
				</p>
			</header>

			<div className='grid grid-cols-1 items-start gap-7 lg:grid-cols-12'>
				<div className='min-w-0 space-y-8 lg:col-span-8'>
					<section
						aria-label='Create a forum discussion'
						className='rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5'
					>
						<SubmitForum categories={categories} />
					</section>

					<section aria-labelledby='latest-threads-heading'>
						<div className='mb-4 flex flex-wrap items-center justify-between gap-3 px-1'>
							<div className='flex items-center gap-2.5'>
								<span className='h-2.5 w-2.5 rounded-full bg-cyan-500' />
								<h2
									id='latest-threads-heading'
									className='text-xl font-bold text-slate-900'
								>
									Latest Community Threads
								</h2>
							</div>
							<span className='text-xs font-semibold text-slate-500'>
								Newest first
							</span>
						</div>

						<ForumFeed category={currentCategory?.id} />
					</section>

					<ForumChambers />
				</div>

				<aside aria-label='Forum sidebar' className='space-y-6 lg:col-span-4'>
					<section className='rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6'>
						<div className='mb-5 flex items-center justify-between'>
							<h2 className='text-lg font-bold text-sky-950'>
								Harbor Telemetry
							</h2>
							<Activity size={19} className='text-cyan-700' />
						</div>
						<div className='grid grid-cols-2 gap-3'>
							{metrics.map(({ title, value, icon: Icon }) => (
								<div key={title} className='rounded-xl bg-slate-50 p-3.5'>
									<Icon size={17} className='mb-2 text-cyan-700' />
									<p className='text-xl font-extrabold text-sky-950'>{value}</p>
									<p className='mt-1 text-xs text-slate-600'>{title}</p>
								</div>
							))}
						</div>
					</section>

					<section className='rounded-2xl bg-gradient-to-br from-[#073c59] to-[#087f97] p-6 text-white shadow-sm'>
						<h2 className='text-xl font-bold'>Dive In with Us</h2>
						<p className='mt-2 text-sm leading-relaxed text-cyan-50'>
							Share a question, tell us about your dive experience, and connect
							with the community.
						</p>
					</section>

					{/* <section className='rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6'>
						<h2 className='mb-4 text-lg font-bold text-sky-950'>
							Discover More Topics
						</h2>
						<div className='space-y-2'>
							{chambers.map(({ title, icon: Icon }) => (
								<div
									key={title}
									className='flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700'
								>
									<div className='flex min-w-0 items-center gap-3'>
										<Icon size={18} className='shrink-0 text-cyan-700' />
										<span>{title}</span>
									</div>
									<span className='text-xs text-slate-400'>Soon</span>
								</div>
							))}
						</div>
					</section> */}
				</aside>
			</div>
		</main>
	);
}
