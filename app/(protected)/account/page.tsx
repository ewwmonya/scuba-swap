import AccountSettings from '@/components/account/AccountSettings';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { prisma } from '@/lib/prismaActions';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
	const user = await getCurrentUserProfile();

	if (!user) {
		redirect('/login');
	}

	const profile = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
		select: {
			username: true,
			email: true,
			avatar: {
				select: {
					url: true,
				},
			},
		},
	});

	if (!profile) {
		redirect('/login');
	}

	return <AccountSettings user={profile} />;
}
