import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { MdOutlineScubaDiving } from 'react-icons/md';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';

function ProductionNavbar({ withSidebar }: { withSidebar: boolean }) {
	return (
		<nav>
			<header>
				<div
					className={cn(
						'bg-white flex items-center w-full border-b-2 border-gray-200 shadow-xs py-4 px-8',
						withSidebar && 'xl:h-16 xl:border-b xl:border-[#e2e8f0] xl:bg-white/80 xl:px-6 xl:py-0 xl:backdrop-blur-lg',
					)}
				>
					<Link
						href='/'
						className='flex flex-nowrap items-center gap-2 lg:pl-8 pl-2'
					>
						<MdOutlineScubaDiving className='text-4xl lg:text-3xl text-slate-800' />
						<h1 className='text-3xl text-slate-800 font-bold'>ScubaSwap</h1>
					</Link>
				</div>
			</header>
		</nav>
	);
}

export default async function NavbarServer({ withSidebar = false }: { withSidebar?: boolean }) {
	if (process.env.NODE_ENV === 'production') {
		return <ProductionNavbar withSidebar={withSidebar} />;
	}

	const data = await getCurrentUserProfile();
	return <Navbar view={false} username={data?.username} withSidebar={withSidebar} />;
}
