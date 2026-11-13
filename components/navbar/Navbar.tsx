import { MdOutlineScubaDiving } from 'react-icons/md';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Profile from './Profile';
import Menu, { LinkType } from './Menu';

type DATA = {
	name: string;
	url: string;
};
const profileLinks: LinkType[] = [
	// { link: '/account', text: 'account' },
	// { link: '/profile', text: 'profile' },
];
const navLink: DATA[] = [
	// { name: 'marketplace', url: '/marketplace' },
	{ name: 'feed', url: '/feed' },
	{ name: 'community forum', url: '/forum' },
	{ name: 'Dive Gear Blogs', url: '/blogs' },
	// { name: 'policy', url: '/policy' },
	// { name: 'messages', url: '/messages' },
	// { name: 'shop gear', url: '/gear' },
];

function Navbar({
	username,
	withSidebar = false,
}: {
	username?: string;
	view: boolean;
	withSidebar?: boolean;
}) {
	return (
		<nav>
			<header>
				<div
					className={cn(
						'grid w-full grid-cols-7 border-b-2 border-gray-200 bg-white px-8 py-8 shadow-xs',
						withSidebar && 'xl:flex xl:h-16 xl:items-center xl:justify-between xl:border-b xl:border-[#e2e8f0] xl:bg-white/80 xl:px-6 xl:py-0 xl:backdrop-blur-lg',
					)}
				>
					<div className=' grid lg:flex lg:flex-row lg:flex-wrap shrink-2 content-center gap-6 col-span-5'>
						<Link href={'/'} className='flex flex-nowrap gap-2 '>
							<MdOutlineScubaDiving
								className='text-4xl lg:text-3xl text-slate-800 '
								width={20}
								height={20}
							/>
							<h1 className='text-3xl text-slate-800 font-bold'>ScubaSwap</h1>
						</Link>
						<ul
							className={cn(
								'flex gap-4 lg:grid lg:grid-flow-col grid-cols-3 lg:grid-cols-1',
								withSidebar && 'xl:hidden',
							)}
						>
							{navLink.map((l) => {
								return (
									<li
										key={l.name}
										className='border-b hover:border-b-0 transition-all duration-100'
									>
										<Button asChild variant={'ghost'}>
											<Link href={l.url} className='capitalize font-bold'>
												{l.name}
											</Link>
										</Button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className='hidden lg:flex flex-wrap lg:flex-nowrap lg:gap-8 gap-6 '>
						<div className={cn('lg:w-sm w-full', withSidebar && 'xl:hidden')} />
						{username ?
							<Menu links={profileLinks}>
								<Profile src={username} />
							</Menu>
						:	<div className=' grid-cols-2 gap-8 grid'>
								<Button asChild>
									<Link href={'/login'}>Login</Link>
								</Button>
								<Button variant={'secondary'} asChild>
									<Link href={'/signup'}>Signup Now!</Link>
								</Button>
							</div>
						}
					</div>
				</div>
			</header>
		</nav>
	);
}
export default Navbar;
