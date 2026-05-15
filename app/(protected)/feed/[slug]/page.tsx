export const dynamic = 'force-dynamic';

import ForumCard from '@/components/forum/ForumCard';
import TimeAgo from '@/components/forum/TimeAgo';
import { diveMetaType } from '@/components/posts-divelog/PostCard';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { prisma } from '@/lib/prismaActions';
import Image from 'next/image';

async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const data = await prisma.dives.findFirst({
		where: {
			id: slug,
		},
	});
	const comments = await prisma.diveComment.findMany({
		where: {
			diveId: slug,
		},
	});
	const user = await prisma.user.findFirst({
		where: {
			id: data?.userId,
		},
	});
	const caption = `Dive at ${data?.location}, at Max Depth of ${data?.maximum_depth}`;
	const diveMeta: diveMetaType[] = [
		{ key: 'caption', label: 'Caption' },
		{ key: 'dive_number', label: 'Dive Number' },
		{ key: 'entry_time', label: 'Entry Time' },
		{ key: 'exit_time', label: 'Exit Time' },
		{ key: 'maximum_depth', label: 'Max Depth', unit: 'ft' },
		{ key: 'bottom_time', label: 'Bottom Time', unit: 'min' },
	];
	return (
		<>
			<Breadcrumb className='my-8'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/feed'>Feed</BreadcrumbLink>
					</BreadcrumbItem>
					{user && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className='font-bold'>
									<span className='tracking-wide opacity-65 font-light'>
										Dive By:
									</span>
									{` ${user.username}`}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
			<div className='flex-1 mb-4 min-h-screen grid grid-cols-1 lg:grid-cols-8'>
				<div className='col-span-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm '>
					<div className='flex items-center gap-3'>
						<div>
							<p className='font-bold text-slate-800 dark:text-white'>
								{` ${user?.username}`}
							</p>
						</div>
					</div>
					<h1 className='mt-4 text-lg md:text-xl font-extrabold text-slate-900 dark:text-white'>
						{caption}
					</h1>
					<div className='mt-4 space-y-4 text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none'>
						{diveMeta.map((field) => {
							const value = data?.[field.key];
							if (!value) return null;
							return (
								<p key={field.key} className='text-gray-600 tracking-wide'>
									<span className='font-black'>{field.label}:</span>
									<br />
									<span className='font-mono'>
										{value} {field.unit ?? ''}
									</span>
								</p>
							);
						})}
					</div>

					{comments.length <= 0 ?
						<div className='h-1/3 w-full bg-sky-100 rounded-xl my-10 opacity-35 p-8'>
							<p className='text-xl tracking-widest'>
								This Forum Has No Comments Yet
								<span className='animate-pulse'>...</span>
							</p>
						</div>
					:	<>
							{comments?.map((c) => {
								return (
									<section key={c.id}>
										<ForumCard data={c} longDes={true} />
									</section>
								);
							})}
						</>
					}
				</div>
				<div className=''></div>
			</div>
		</>
	);
}
export default page;
