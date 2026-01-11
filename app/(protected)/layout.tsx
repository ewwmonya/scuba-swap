import { ReactNode } from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NavbarServer from '@/components/navbar/NavbarServer';
import Container from '@/components/globals/Container';

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
							cookieStore.set(name, value, options)
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		}
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) redirect('/login');

	return (
		<>
			<NavbarServer />
			<Container>{children}</Container>
		</>
	);
}
