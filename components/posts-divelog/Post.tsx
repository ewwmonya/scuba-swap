import PostCard from '@/components/posts-divelog/PostCard';
import { diveCardInclude } from '@/lib/diveCards';
import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

async function Post() {
	const viewer = await getCurrentUserProfile();
	if (!viewer) return <p className='mt-20'>Please log in to view dive logs.</p>;

	let dives;
	try {
		dives = await prisma.dives.findMany({
			include: diveCardInclude(viewer.id),
		});
	} catch {
		return (
			<p role='status' className='p-4 text-slate-700'>
				Could not load dive logs. Try refreshing the page.
			</p>
		);
	}

	if (!dives.length)
		return <p className='p-4 text-slate-700'>No dive logs yet.</p>;

	return (
		<div className='grid min-w-0 gap-6'>
			{dives.map((dive) => (
				<PostCard key={dive.id} dive={dive} viewerId={viewer.id} />
			))}
		</div>
	);
}

export default Post;
