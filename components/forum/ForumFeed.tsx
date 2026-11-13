import ForumCard from '@/components/forum/ForumCard';
import Link from 'next/link';
import { prisma } from '@/lib/prismaActions';

async function getFeed() {
  try {
    return await prisma.post.findMany({
      include: {
        user: { select: { username: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Could not load forum feed', error);
    return [];
  }
}

export async function ForumFeed() {
  const data = await getFeed();
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <h3 className="font-bold text-sky-950">No forum discussions yet</h3>
        <p className="mt-2 text-sm text-slate-600">Start the conversation with the form above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((post) => {
        const slug = post.caption.replaceAll(' ', '-');
        return (
          <Link key={post.id} href={`/forum/${slug}`} className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
            <ForumCard data={post} username={post.user.username} replyCount={post._count.comments} longDes />
          </Link>
        );
      })}
    </div>
  );
}
