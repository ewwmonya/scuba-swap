import { getUserName } from '@/lib/prisma/getTableUserName';
import Navbar from './Navbar';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';

export default async function NavbarServer() {
	const data = await getCurrentUserProfile();

	return <Navbar view={false} username={data?.username} />;
}
