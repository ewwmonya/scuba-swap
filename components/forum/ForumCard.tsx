import { Clock3, MessageCircle } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { prisma } from '@/lib/prismaActions';

dayjs.extend(relativeTime);

type ForumCardProps = {
  data: {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    caption?: string;
  };
  longDes?: boolean;
  username?: string;
  replyCount?: number;
};

export default async function ForumCard({
  data,
  longDes = false,
  username,
  replyCount,
}: ForumCardProps) {
  // The thread page also reuses this card for replies, so allow fallback lookup.
  let author = username;
  if (!author) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: { username: true },
    });
    author = user?.username ?? 'Diver';
  }

  const initials = author.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return (
    <article id={data.id} className="group flex min-w-0 items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50/30 hover:shadow-md sm:p-5">
      <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-sky-900">
        {initials || 'D'}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-sky-900">Community Discussion</span>
          <span className="text-slate-500">Started by</span>
          <span className="font-semibold text-slate-800">{author}</span>
        </div>
        {data.caption && (
          <h3 className="wrap-break-word text-base font-bold leading-snug text-sky-950 transition-colors group-hover:text-cyan-700 sm:text-lg">
            {data.caption}
          </h3>
        )}
        <p className={`wrap-break-word text-sm leading-relaxed text-slate-600 ${longDes ? 'line-clamp-2' : 'whitespace-pre-line'}`}>
          {data.content}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{dayjs(data.createdAt).fromNow()}</span>
          {replyCount !== undefined && (
            <span className="inline-flex items-center gap-1.5"><MessageCircle size={14} />{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
          )}
        </div>
      </div>
    </article>
  );
}
