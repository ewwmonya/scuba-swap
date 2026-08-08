import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { MdOutlineScubaDiving } from 'react-icons/md';
import Link from 'next/link';
import Navbar from './Navbar';

function ProductionNavbar() {
	return (
		<nav>
			<header>
				<div className='bg-white flex items-center w-full border-b-2 border-gray-200 shadow-xs py-4 px-8'>
					<Link href='/' className='flex flex-nowrap items-center gap-2 lg:pl-8 pl-2'>
						<MdOutlineScubaDiving className='text-4xl lg:text-3xl text-slate-800' />
						<h1 className='text-3xl text-slate-800 font-bold'>ScubaSwap</h1>
					</Link>
				</div>
			</header>
		</nav>
	);
}

export default async function NavbarServer() {
	if (process.env.NODE_ENV === 'production') {
		return <ProductionNavbar />;
	}

	const data = await getCurrentUserProfile();
	return <Navbar view={false} username={data?.username} />;
}
