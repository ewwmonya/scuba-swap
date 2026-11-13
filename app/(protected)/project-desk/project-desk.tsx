'use client';

import { useEffect, useMemo, useState } from 'react';

type Post = {
	id: string;
	caption: string;
	content: string;
	imageUrl: string | null;
	createdAt: string;
	user: { username: string };
	_count: { comments: number; likes: number };
};
type Dive = {
	id: string;
	location: string;
	content: string;
	dive_number: number;
	dive_date: string;
	user: { username: string };
	_count: { comments: number; likes: number };
};
type Milestone = { title: string; note: string; done: boolean };

const initialMilestones: Milestone[] = [
	{ title: 'Core database schema', note: 'Users, posts, dive logs, comments, and likes', done: true },
	{ title: 'Authentication and profiles', note: 'Connect Supabase Auth users to app profiles', done: true },
	{ title: 'Community post feed', note: 'Create, browse, like, and comment on posts', done: false },
	{ title: 'Dive log experience', note: 'Create dive logs and share them with the community', done: false },
	{ title: 'Gear swap listings', note: 'Build the listing and exchange workflow', done: false },
	{ title: 'Admin and moderation tools', note: 'Review community activity and handle reports', done: false },
	{ title: 'Launch polish', note: 'Test mobile layouts, empty states, and onboarding', done: false },
];
const STORAGE_KEY = 'scubaswap-project-desk-milestones-v1';

function displayDate(value: string) {
	return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function ProjectDesk({
	stats,
	initialPosts,
	recentDives,
}: {
	stats: { postCount: number; diveCount: number; memberCount: number; commentCount: number };
	initialPosts: Post[];
	recentDives: Dive[];
}) {
	const [section, setSection] = useState<'overview' | 'posts' | 'progress'>('overview');
	const [posts, setPosts] = useState(initialPosts);
	const [search, setSearch] = useState('');
	const [milestones, setMilestones] = useState(initialMilestones);
	const [loadedMilestones, setLoadedMilestones] = useState(false);
	const [hasMore, setHasMore] = useState(stats.postCount > initialPosts.length);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const doneCount = milestones.filter((milestone) => milestone.done).length;
	const completion = milestones.length ? Math.round((doneCount / milestones.length) * 100) : 0;
	const nextMilestone = milestones.find((milestone) => !milestone.done);
	const filteredPosts = useMemo(
		() => posts.filter((post) => `${post.caption} ${post.content} ${post.user.username}`.toLowerCase().includes(search.toLowerCase())),
		[posts, search],
	);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) setMilestones(JSON.parse(saved) as Milestone[]);
		} catch {
			// Keep the starter milestone list if local storage is unavailable.
		} finally {
			setLoadedMilestones(true);
		}
	}, []);

	useEffect(() => {
		if (loadedMilestones) localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
	}, [loadedMilestones, milestones]);

	async function loadMorePosts() {
		setLoading(true);
		setError('');
		try {
			const response = await fetch(`/api/project-desk/posts?offset=${posts.length}`, { cache: 'no-store' });
			if (!response.ok) throw new Error(response.status === 401 ? 'Please sign in again to load more posts.' : 'Could not load more posts.');
			const result = (await response.json()) as { posts: Post[]; hasMore: boolean };
			setPosts((current) => [...current, ...result.posts]);
			setHasMore(result.hasMore);
		} catch (loadError) {
			setError(loadError instanceof Error ? loadError.message : 'Could not load more posts.');
		} finally {
			setLoading(false);
		}
	}

	function toggleMilestone(index: number) {
		setMilestones((current) => current.map((milestone, i) => i === index ? { ...milestone, done: !milestone.done } : milestone));
	}

	function addMilestone() {
		const title = window.prompt('What milestone do you want to add?');
		if (title?.trim()) setMilestones((current) => [...current, { title: title.trim(), note: 'New project milestone', done: false }]);
	}

	return (
		<main className="mx-auto my-8 max-w-6xl space-y-7 px-3 pb-12">
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">ScubaSwap · Build log</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Project Desk</h1>
					<p className="mt-2 text-sm text-slate-500">Progress, community activity, and dive logs from the existing ScubaSwap database.</p>
				</div>
				<nav className="flex gap-2" aria-label="Project Desk sections">
					{(['overview', 'posts', 'progress'] as const).map((item) => (
						<button key={item} onClick={() => setSection(item)} className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${section === item ? 'bg-teal-800 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}>
							{item}
						</button>
					))}
				</nav>
			</header>

			{section === 'overview' && <>
				<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
					<Stat label="Community posts" value={stats.postCount} accent="teal" />
					<Stat label="Dive logs" value={stats.diveCount} accent="blue" />
					<Stat label="Members" value={stats.memberCount} accent="amber" />
					<Stat label="Post comments" value={stats.commentCount} accent="slate" />
				</div>
				<div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
					<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
						<div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Latest activity</p><h2 className="mt-1 text-lg font-bold">Recent posts</h2></div><button onClick={() => setSection('posts')} className="text-sm font-semibold text-teal-700">Browse posts →</button></div>
						<PostList posts={initialPosts.slice(0, 5)} />
					</section>
					<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
						<div className="mb-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Build progress</p><h2 className="mt-1 text-lg font-bold">{completion}% complete</h2></div>
						<div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${completion}%` }} /></div>
						<p className="mt-2 text-xs text-slate-500">{doneCount} of {milestones.length} milestones complete</p>
						<div className="mt-6 rounded-xl bg-teal-50 p-4 dark:bg-teal-950/40"><p className="text-xs font-bold uppercase tracking-widest text-teal-700">Next up</p><p className="mt-2 font-semibold text-slate-800 dark:text-white">{nextMilestone?.title ?? 'All current milestones complete'}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{nextMilestone?.note ?? 'Add a new milestone when the next phase starts.'}</p></div>
						<button onClick={() => setSection('progress')} className="mt-4 text-sm font-semibold text-teal-700">Update progress →</button>
					</section>
				</div>
				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
					<div className="mb-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent dive activity</p><h2 className="mt-1 text-lg font-bold">Dive logs</h2></div>
					{recentDives.length ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{recentDives.map((dive) => <article key={dive.id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-800"><p className="text-xs text-slate-400">Dive #{dive.dive_number} · {displayDate(dive.dive_date)}</p><h3 className="mt-1 font-bold">{dive.location}</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{dive.content}</p><p className="mt-3 text-xs text-slate-400">{dive.user.username} · {dive._count.comments} comments · {dive._count.likes} likes</p></article>)}</div> : <Empty text="No dive logs in the database yet." />}
				</section>
			</>}

			{section === 'posts' && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
				<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Community content</p><h2 className="mt-1 text-xl font-bold">All posts <span className="text-sm font-normal text-slate-400">({stats.postCount})</span></h2></div><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search posts or members" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 sm:max-w-xs dark:border-slate-700 dark:bg-slate-950" />
				</div>
				<PostList posts={filteredPosts} />
				{error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
				{hasMore && <div className="mt-6 text-center"><button onClick={loadMorePosts} disabled={loading} className="rounded-lg bg-teal-800 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Loading…' : 'Load more posts'}</button></div>}
			</section>}

			{section === 'progress' && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
				<div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Build milestones</p><h2 className="mt-1 text-xl font-bold">{doneCount} of {milestones.length} complete</h2><p className="mt-1 text-sm text-slate-500">Progress is saved in this browser.</p></div><button onClick={addMilestone} className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-semibold text-white">＋ Add milestone</button></div>
				<div className="space-y-2">{milestones.map((milestone, index) => <button key={`${milestone.title}-${index}`} onClick={() => toggleMilestone(index)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-4 text-left hover:border-teal-200 dark:border-slate-800"><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs ${milestone.done ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 text-transparent'}`}>✓</span><span className="min-w-0 flex-1"><strong className={`block text-sm ${milestone.done ? 'text-slate-400 line-through' : ''}`}>{milestone.title}</strong><span className="mt-1 block text-xs text-slate-500">{milestone.note}</span></span><span className={`rounded-full px-2.5 py-1 text-xs ${milestone.done ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>{milestone.done ? 'Complete' : 'Planned'}</span></button>)}</div>
			</section>}

			<p className="text-center text-xs text-slate-400">Read-only database view · Uses the existing server-side Prisma connection · No Supabase keys are stored in the browser</p>
		</main>
	);
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
	const colors: Record<string, string> = { teal: 'bg-teal-50 text-teal-700', blue: 'bg-blue-50 text-blue-700', amber: 'bg-amber-50 text-amber-700', slate: 'bg-slate-100 text-slate-700' };
	return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p><p className="mt-3 flex items-center gap-3 text-3xl font-bold"><span className={`grid h-9 w-9 place-items-center rounded-xl text-sm ${colors[accent]}`}>•</span>{value.toLocaleString()}</p></article>;
}

function PostList({ posts }: { posts: Post[] }) {
	if (!posts.length) return <Empty text="No posts found." />;
	return <div className="divide-y divide-slate-100 dark:divide-slate-800">{posts.map((post) => <article key={post.id} className="py-4 first:pt-0 last:pb-0"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold">{post.caption || 'Community post'}</p><p className="mt-1 text-xs text-slate-400">{post.user.username} · {displayDate(post.createdAt)}</p></div><span className="whitespace-nowrap text-xs text-slate-400">{post._count.comments} comments · {post._count.likes} likes</span></div><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">{post.content}</p>{post.imageUrl && <a href={post.imageUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-teal-700">View attached image ↗</a>}</article>)}</div>;
}

function Empty({ text }: { text: string }) {
	return <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800/60">{text}</p>;
}
