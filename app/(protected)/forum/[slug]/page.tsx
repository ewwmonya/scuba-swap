export const dynamic = 'force-dynamic';

import ForumCard from '@/components/forum/ForumCard';
import { ForumComment } from '@/components/forum/ForumComment';
import TimeAgo from '@/components/forum/TimeAgo';
import { notFound } from 'next/navigation';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { prisma } from '@/lib/prismaActions';

async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	console.log(slug);
	const data = await prisma.post.findFirst({
		where: {
			caption: slug.replaceAll('-', ' '),
		},
	});
	const comments = await prisma.postComment.findMany({
		where: {
			postId: data?.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	const user = await prisma.user.findFirst({
		where: {
			id: data?.userId,
		},
	});
	if (!data) {
		notFound();
	}
	return (
		<>
			<Breadcrumb className='my-8'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/forum'>Forums</BreadcrumbLink>
					</BreadcrumbItem>
					{user && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className='font-bold'>
									<h1>
										<span className='tracking-wide opacity-65 font-light'>
											Forum Post by:
										</span>
										{` ${user.username}`}
									</h1>
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
			<main className='flex-1 mb-4 min-h-screen'>
				<section className='p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm'>
					<div className='flex items-center gap-3'>
						<div>
							<p className='font-bold text-slate-800 dark:text-white'>
								{` ${user?.username}`}
							</p>
							{data?.createdAt && <TimeAgo data={data?.createdAt} />}
						</div>
					</div>
					<h2 className='mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white'>
						{data?.caption}
					</h2>
					<div className='mt-4 space-y-4 text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none'>
						{data?.content
							?.split('\n')
							?.filter((line) => line.trim() !== '')
							.map((item, index) => {
								return <p key={index}>{item}</p>;
							})}
					</div>
				</section>

				<div
					className={`flex ${comments.length <= 10 ? 'flex-col' : 'flex-col-reverse'} `}
				>
					<div className=''>
						{comments.length <= 0 ?
							<div className='h-1/3 w-full bg-sky-50 rounded-xl my-10 opacity-35 p-8 mt-4'>
								<p className='text-xl tracking-widest'>
									This Forum Has No Comments Yet
									<span className='animate-pulse'>...</span>
								</p>
							</div>
						:	<>
								{comments?.map((c) => {
									return (
										<section id={c.id} className='my-4' key={c.id}>
											<ForumCard data={c} longDes={true} />
										</section>
									);
								})}
							</>
						}
					</div>
					<div className='pt-4'>
						<ForumComment postId={data?.id} commentType={'Form'} />
					</div>
				</div>
			</main>
		</>
	);
}
export default page;
