import { prisma } from '@/lib/prismaActions';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Navbar from './Navbar';

export default async function NavbarServer() {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
			},
		}
	);
	const l = await supabase.auth.getUser();
	if (l) {
		const user = await prisma?.user.findUnique({
			where: {
				uuID_auth: l.data?.user?.id,
			},
		});
		return (
			user && user.username && <Navbar username={user.username} view={true} />
		);
	} else {
		return <Navbar username={'No name ass'} view={false} />;
	}
}
