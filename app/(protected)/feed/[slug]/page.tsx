import { notFound } from 'next/navigation';
import TimeAgo from '@/components/forum/TimeAgo';
import { DiverAvatar } from '@/components/posts-divelog/DiverAvatar';
import PostCard from '@/components/posts-divelog/PostCard';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { diveCardInclude } from '@/lib/diveCards';
import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

export const dynamic = 'force-dynamic';

export default async function DivePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const viewer = await getCurrentUserProfile();
	const dive = await prisma.dives.findUnique({
		where: { id: slug },
		include: {
			...diveCardInclude(viewer?.id),
			comments: {
				orderBy: { createdAt: 'desc' },
				include: {
					user: {
						select: { username: true, avatar: { select: { url: true } } },
					},
				},
			},
		},
	});

	if (!dive) notFound();

	return (
		<div className='mx-auto max-w-4xl space-y-4 pb-8'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/feed'>Dive Log Feed</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dive #{dive.dive_number}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className='font-[family-name:var(--font-scuba-heading)] text-2xl font-bold wrap-anywhere text-slate-900 sm:text-4xl'>
				Dive at {dive.location}
			</h1>
			<PostCard dive={dive} viewerId={viewer?.id}>
				<section
					id='dive-comments'
					className='scroll-mt-20 space-y-4 border-t border-slate-200 bg-slate-50/80 p-4'
				>
					<div className='flex flex-wrap items-baseline justify-between gap-2'>
						<h2 className='font-[family-name:var(--font-scuba-heading)] text-lg font-semibold'>
							Dive Debrief &amp; Comments
						</h2>
						<span className='text-xs text-slate-600'>
							{dive.comments.length}{' '}
							{dive.comments.length === 1 ? 'response' : 'responses'}
						</span>
					</div>
					{dive.comments.length === 0 ? (
						<p className='text-sm text-slate-600'>
							No comments on this dive yet.
						</p>
					) : (
						<ul className='space-y-3'>
							{dive.comments.map((comment) => (
								<li key={comment.id} className='flex items-start gap-3'>
									<DiverAvatar
										username={comment.user.username}
										url={comment.user.avatar?.url}
										size={36}
									/>
									<div className='min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-3'>
										<div className='flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1'>
											<p className='min-w-0 text-sm font-semibold wrap-anywhere text-sky-800'>
												@{comment.user.username}
											</p>
											<TimeAgo data={comment.createdAt} />
										</div>
										<p className='mt-1 text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap text-slate-700'>
											{comment.content}
										</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>
			</PostCard>
		</div>
	);
}
