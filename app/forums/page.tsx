import type { Metadata } from 'next';
import {
  Activity, BookOpen, Camera, ChevronRight, Clock3, Compass,
  HeartPulse, MessageCircle, Search, ShieldCheck, Users, Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forums',
  description: 'Discover community discussions, dive gear conversations, and diving destinations.',
};

// First-pass layout samples only. Replace these with forum records when the
// thread/category models and queries are ready.
const exampleThreads = [
  {
    id: 'sample-1', category: 'Equipment & Tech', initials: 'JD',
    author: 'Demo Diver', title: 'What should I look for in my first regulator?',
    excerpt: 'Comparing balanced first stages, service availability, and cold-water performance.',
    replies: 12, updated: 'Example discussion', tone: 'bg-sky-100 text-sky-800',
  },
  {
    id: 'sample-2', category: 'Dive Destinations', initials: 'SR',
    author: 'Sample Reef', title: 'Planning a week of diving in Bonaire',
    excerpt: 'Looking for shore diving recommendations and advice for a first visit.',
    replies: 8, updated: 'Example discussion', tone: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'sample-3', category: 'Underwater Photography', initials: 'OC',
    author: 'Ocean Camera', title: 'Tips for getting natural colors in underwater photos',
    excerpt: 'How do you handle white balance and lighting on deeper dives?',
    replies: 5, updated: 'Example discussion', tone: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'sample-4', category: 'Dive Safety', initials: 'DB',
    author: 'Dive Buddy', title: 'Building a pre-dive buddy check routine',
    excerpt: 'Share the habits that make your pre-dive planning more consistent.',
    replies: 15, updated: 'Example discussion', tone: 'bg-amber-100 text-amber-800',
  },
];

const chambers = [
  { title: 'Equipment Lab & Tech', description: 'Regulators, BCDs, dive computers, rebreathers and gear maintenance.', icon: Wrench, color: 'bg-sky-100 text-sky-800' },
  { title: 'Regional & Travel', description: 'Dive destinations, local dive sites, liveaboards and trip reports.', icon: Compass, color: 'bg-cyan-100 text-cyan-800' },
  { title: 'Diving Medicine & Safety', description: 'Safety practices, training discussions and diving physiology.', icon: HeartPulse, color: 'bg-rose-100 text-rose-800' },
  { title: 'Underwater Photo & Video', description: 'Camera setups, strobes, editing and underwater creativity.', icon: Camera, color: 'bg-violet-100 text-violet-800' },
];

function ForumThreadCard({ thread }: { thread: (typeof exampleThreads)[number] }) {
  return (
    <article className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-cyan-200 hover:shadow-md sm:p-5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${thread.tone}`}>
        {thread.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-sky-900">{thread.category}</span>
          <span className="text-slate-500">Started by <strong className="font-semibold text-slate-700">{thread.author}</strong></span>
        </div>
        <h3 className="text-base font-bold leading-snug text-sky-950 transition group-hover:text-cyan-700 sm:text-lg">{thread.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{thread.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{thread.updated}</span>
          <span className="inline-flex items-center gap-1.5"><MessageCircle size={14} />{thread.replies} sample replies</span>
        </div>
      </div>
    </article>
  );
}

export default function ForumsPage() {
  return (
    <main className="min-h-screen bg-[#f3f7f9] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-gradient-to-br from-[#073c59] via-[#075b78] to-[#087c94] px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
            <Compass size={16} /> Scuba Traders Community
          </div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Dive into the conversation.</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cyan-50 sm:text-base">
                Explore dive gear, destinations, safety, photography, and the people who make diving better.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
              <MessageCircle size={18} /> Forum preview
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section aria-labelledby="threads-heading">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  <h2 id="threads-heading" className="text-xl font-bold text-slate-900">Latest Community Threads</h2>
                </div>
                <span className="text-xs font-medium text-slate-500">Sample layout · No live sorting yet</span>
              </div>
              <div className="mb-3 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-950">
                Design preview: the discussions and reply counts below are sample content, not live community posts.
              </div>
              <div className="space-y-3">
                {exampleThreads.map((thread) => <ForumThreadCard key={thread.id} thread={thread} />)}
              </div>
            </section>

            <section aria-labelledby="chambers-heading" className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 id="chambers-heading" className="text-xl font-bold text-slate-900">Explore Forum Chambers</h2>
                <span className="text-xs text-slate-500">Categories preview</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {chambers.map(({ title, description, icon: Icon, color }) => (
                  <article key={title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={24} /></div>
                    <div>
                      <h3 className="font-bold text-sky-950">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4" aria-label="Forum sidebar">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-sky-950">Harbor Telemetry</h2>
                <Activity size={20} className="text-cyan-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Threads', icon: MessageCircle },
                  { label: 'Total Messages', icon: BookOpen },
                  { label: 'Registered Divers', icon: Users },
                  { label: 'Active Now', icon: Activity },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3.5">
                    <Icon size={17} className="mb-2 text-cyan-700" />
                    <div className="text-xl font-extrabold text-slate-400">—</div>
                    <div className="mt-1 text-xs text-slate-600">{label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">Live statistics will appear when forum data is connected.</p>
            </section>

            <section className="rounded-2xl bg-gradient-to-br from-[#073c59] to-[#076c86] p-6 text-white shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><ShieldCheck size={22} /></div>
              <h2 className="text-lg font-bold">Dive In with Us</h2>
              <p className="mt-2 text-sm leading-relaxed text-cyan-50">The Scuba Traders community is taking shape. Share dive logs and connect with other divers as new features roll out.</p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-sky-950">Discover More Topics</h2>
                <Search size={18} className="text-cyan-700" />
              </div>
              <div className="space-y-1">
                {chambers.map(({ title, icon: Icon }) => (
                  <div key={title} className="flex items-center justify-between gap-3 rounded-xl px-2 py-3 text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-3"><Icon size={18} className="text-cyan-700" />{title}</span>
                    <ChevronRight size={16} className="shrink-0 text-slate-400" />
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
