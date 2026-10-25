import Link from 'next/link';
import { BookOpen, Compass, LifeBuoy, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

const exploreLinks = [
  { href: '/feed', label: 'Dive Log Feed', icon: Compass },
  { href: '/forum', label: 'Community Forum', icon: MessageCircle },
  { href: '/blogs', label: 'Dive Gear Blogs', icon: BookOpen },
];

export default function FeedSidebar() {
  return (
    <aside aria-label="Feed sidebar" className="hidden w-full space-y-4 lg:block">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Explore</h2>
        <nav aria-label="Explore ScubaSwap" className="space-y-1">
          {exploreLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-slate-900">
          <LifeBuoy aria-hidden="true" className="h-5 w-5 text-sky-700" />
          <h2 className="font-semibold">Our Community</h2>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          Share dive logs, ask questions, and connect with divers who love exploring underwater.
        </p>
        <Link href="/forum" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:underline">
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Visit the forum
        </Link>
      </section>

      <section className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
        <div className="mb-2 flex items-center gap-2 text-sky-900">
          <ShieldCheck aria-hidden="true" className="h-5 w-5" />
          <h2 className="font-semibold">Dive Tip</h2>
        </div>
        <p className="text-sm leading-6 text-sky-950/80">
          Plan your dive, dive your plan, and always stay within your training and limits.
        </p>
      </section>
    </aside>
  );
}
