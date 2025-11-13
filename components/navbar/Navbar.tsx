import { MdOutlineScubaDiving } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '../ui/button';
import Search from './Search';

type DATA = {
	name: string;
	url: string;
};

const mockData: DATA[] = [
	{ name: 'marketplace', url: '/marketplace' },
	{ name: 'community forum', url: '/forum' },
	{ name: 'messages', url: '/messages' },
	{ name: 'shop gear', url: '/gear' },
];

function Navbar() {
	return (
		<nav>
			<section>
				<div className='grid grid-cols-2 justify-between w-full border-b-2 border-gray-100 shadow-xs px-8 py-4'>
					<div className='flex flex-nowrap shrink-0 gap-6'>
						<Link href={'/'} className='flex flex-nowrap gap-2'>
							<MdOutlineScubaDiving
								className='text-3xl text-slate-800'
								width={20}
								height={20}
							/>
							<h1 className='text-xl text-slate-800 font-bold'>ScubaSwap</h1>
						</Link>
						<ul className='grid grid-flow-col'>
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
					<div className=''>
						<Search />
					</div>
				</div>
			</section>
		</nav>
	);
}
export default Navbar;
