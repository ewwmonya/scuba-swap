export const dynamic = 'force-dynamic';

import TimeAgo from '@/components/forum/TimeAgo';
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
	const data = await prisma.post.findFirst({
		where: {
			id: slug,
		},
	});
	const user = await prisma.user.findFirst({
		where: {
			uuID_auth: data?.userId,
		},
	});
	console.log(user);
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
									<span className='tracking-wide opacity-65 font-light'>
										Forum Post by:
									</span>
									{` ${user.username}`}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
			<div className='flex-1 mb-4 h-screen'>
				<div className='p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm'>
					<div className='flex items-center gap-3'>
						<div>
							<p className='font-bold text-slate-800 dark:text-white'>
								{` ${user?.username}`}
							</p>
							{data?.createdAt && <TimeAgo data={data?.createdAt} />}
						</div>
					</div>
					<h1 className='mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white'>
						{data?.caption}
					</h1>
					<div className='mt-4 space-y-4 text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none'>
						{data?.content
							?.split('\n')
							?.filter((line) => line.trim() !== '')
							.map((item, index) => {
								return <p key={index}>{item}</p>;
							})}
					</div>
				</div>
				<div className='h-1/3 w-full bg-sky-100 rounded-xl my-10 opacity-35 p-8'>
					<p className='text-xl tracking-widest'>
						Comments Coming Soon<span className='animate-pulse'>...</span>
					</p>
				</div>
			</div>
		</>
	);
}
export default page;
