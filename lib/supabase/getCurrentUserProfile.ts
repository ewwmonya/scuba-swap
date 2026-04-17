import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { prisma } from '../prismaActions';

export async function getCurrentUserProfile(username?: string) {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll() {},
			},
		},
	);

	const {
		data: { user: authUser },
		error,
	} = await supabase.auth.getUser();

	if (error || !authUser || !authUser.email) {
		return null;
	}
	// console.log(authUser.id);
	let profile = await prisma.user.findUnique({
		where: {
			authId: authUser.id,
		},
	});
	if (!profile && username) {
		profile = await prisma.user.create({
			data: {
				authId: authUser.id,
				email: authUser.email,
				username: username,
			},
		});
	}

	return profile;
}
