import { MdOutlineScubaDiving } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '../ui/button';
import Search from './Search';
import Notifications from './Notifications';
import Profile from './Profile';
import Menu, { LinkType } from './Menu';
import SignInSignUpSignOut from './LogoutBtn';

type DATA = {
	name: string;
	url: string;
};
const profileLinks: LinkType[] = [
	// { link: '/account', text: 'account' },
	// { link: '/profile', text: 'profile' },
];
const notifications: LinkType[] = [
	{
		link: '/messages/293493wewe402sd9309trt2340923',
		text: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit....',
	},
	{
		link: '/messages/2934wew93402aassmjt93092340eerer923',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit....',
	},
];

const mockData: DATA[] = [
	// { name: 'marketplace', url: '/marketplace' },
	// { name: 'feed', url: '/feed' },
	{ name: 'community forum', url: '/forum' },
	// { name: 'policy', url: '/policy' },
	// { name: 'messages', url: '/messages' },
	// { name: 'shop gear', url: '/gear' },
];

function Navbar({ username, view }: { username?: string; view: true | false }) {
	return (
		<nav>
			<section>
				<div className='bg-white items-center lg:flex justify-around grid w-full border-b-2 border-gray-100 shadow-xs py-4 px-8'>
					<div className='lg:flex lg:flex-row lg:flex-wrap shrink-2 gap-6'>
						<Link href={'/'} className='flex flex-nowrap gap-2 lg:pl-8 pl-2'>
							<MdOutlineScubaDiving
								className='text-3xl text-slate-800 '
								width={20}
								height={20}
							/>
							<h1 className='lg:text-xl text-slate-800 font-bold'>ScubaSwap</h1>
						</Link>
						<ul className='grid lg:grid-flow-col grid-cols-3 lg:grid-cols-1'>
							{mockData.map((l) => {
								return (
									<li key={l.name}>
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
					<div className='flex flex-nowrap lg:gap-8 gap-6 '>
						<div className='lg:w-sm w-full'>{/* <Search /> */}</div>
						{/* <Menu links={notifications}>
							<Notifications />
						</Menu> */}
						{username ? (
							<Menu links={profileLinks}>
								<Profile src={username} />
							</Menu>
						) : (
							<div className='grid grid-cols-2 gap-8'>
								<Button asChild>
									<Link href={'/login'}>Login</Link>
								</Button>
								<Button variant={'secondary'} asChild>
									<Link href={'/signup'}>Signup Now!</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</section>
		</nav>
	);
}
export default Navbar;
