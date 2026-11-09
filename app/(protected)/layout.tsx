import { ReactNode, Suspense } from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { redirect } from 'next/navigation';
import NavbarServer from '@/components/navbar/NavbarServer';
import Container from '@/components/globals/Container';
import FeedSidebar from '@/components/navigation/FeedSidebar';

const scubaBody = Plus_Jakarta_Sans({
	variable: '--font-scuba-body',
	subsets: ['latin'],
});

const scubaHeading = Space_Grotesk({
	variable: '--font-scuba-heading',
	subsets: ['latin'],
});

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) redirect('/login');

	return (
		<div className={`${scubaBody.variable} ${scubaHeading.variable} bg-[#f8fafc]`}>
			<div className='xl:sticky xl:top-0 xl:z-50'>
				<NavbarServer withSidebar />
			</div>
			<div className='xl:grid xl:grid-cols-[18rem_minmax(0,1fr)]'>
				<FeedSidebar />
				<Container className='mx-auto w-full min-w-0 max-w-[1340px] px-4 py-4 sm:px-6 xl:max-w-[1340px]'>
					<Suspense fallback={'Loading...'}>{children}</Suspense>
				</Container>
			</div>
		</div>
	);
}
