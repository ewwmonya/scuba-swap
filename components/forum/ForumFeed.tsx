import ForumCard from '@/components/forum/ForumCard';
import Link from 'next/link';
import { prisma } from '@/lib/prismaActions';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

async function getFeed({
	category,
	page = 1,
}: {
	category?: string;
	page?: number;
}) {
	const PAGE_SIZE = 10;

	const safePage = Number.isSafeInteger(page) && page > 0 ? page : 1;

	const skip = (safePage - 1) * PAGE_SIZE;

	const where = category ? { categoryId: category } : {};

	const [posts, totalPosts] = await Promise.all([
		prisma.post.findMany({
			include: {
				user: { select: { username: true } },
				category: { select: { name: true } },
				_count: { select: { comments: true } },
			},
			where,
			orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
			take: PAGE_SIZE,
			skip,
		}),
		prisma.post.count({ where }),
	]);

	return {
		posts,
		totalPosts,
		totalPages: Math.max(1, Math.ceil(totalPosts / PAGE_SIZE)),
	};
}

export async function ForumFeed({
	category,
	page = 1,
}: {
	category?: string;
	page?: number;
}) {
	console.log(page);
	const { posts, totalPosts, totalPages } = await getFeed({ category, page });

	if (!totalPosts) {
		return (
			<div className='rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm'>
				<h3 className='font-bold text-sky-950'>No forum discussions yet</h3>
				<p className='mt-2 text-sm text-slate-600'>
					Start the conversation with the form above.
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-3'>
			{posts.map((post) => {
				const slug = post.caption.replaceAll('?', '').replaceAll(' ', '-');

				return (
					<Link
						key={post.id}
						href={`/forum/${slug}?postId=${post.id}`}
						className='block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
					>
						<ForumCard
							data={post}
							username={post.user.username}
							categoryName={post.category?.name ?? 'General Discussion'}
							replyCount={post._count.comments}
							longDes
						/>
					</Link>
				);
			})}
			<div className='mt-6 flex items-center justify-between'>
				<Pagination>
					<PaginationContent>
						{page > 1 ?
							<PaginationItem>
								<PaginationPrevious href={`/forum?page=${page - 1}`} />
							</PaginationItem>
						:	<span />}
						{Array.from({ length: totalPages }, (_, i) => (
							<PaginationItem key={`${i}=page`}>
								<PaginationLink
									href={`/forum?page=${i + 1}`}
									isActive={page == i + 1}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						{/* <PaginationItem>
							<PaginationEllipsis />
						</PaginationItem> */}
						{page < totalPages ?
							<PaginationItem>
								<PaginationNext href={`/forum?page=${page + 1}`} />
							</PaginationItem>
						:	<span />}
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
