export const dynamic = 'force-dynamic';
import Image from 'next/image';
import hero from '@/public/diver-hero2.jpg';
import heroMobile from '@/public/diver-hero-mobile.jpg';
import okayImage from '@/public/a-okay.jpeg';
import diveBuds from '@/public/scuba-budies.jpeg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MdOutlineScubaDiving } from 'react-icons/md';
import { GiScubaTanks } from 'react-icons/gi';
import Link from 'next/link';
import { ForumFeed } from '@/components/forum/ForumFeed';

function page() {
	return (
		<main className='min-h-[90lvh]  '>
			<div className='grid w-full  contain-content  py-2'>
				<Image
					src={hero}
					alt=''
					height={400}
					width={726}
					className='max-w-[1920px] w-full lg:block hidden lg:rounded-2xl shadow relative'
				/>
				<Image
					src={heroMobile}
					alt=''
					height={400}
					width={726}
					className='w-full lg:hidden block rounded-xl shadow relative'
				/>
				<div className='absolute place-self-center text-white  grid grid-cols-1 lg:grid-cols-2 text-center'>
					<p></p>
					<div className='max-w-xl flex flex-col p-6 lg:mt-6 mt-2'>
						<div className='flex flex-nowrap gap-2 justify-center '>
							<MdOutlineScubaDiving
								className='text-5xl '
								width={20}
								height={20}
							/>
							<h1 className='text-5xl font-bold'>ScubaSwap</h1>
						</div>
						<p className='font-semibold tracking-wider lg:my-4 my-1 px-2 lg:px-8'>
							The ultimate community for scuba enthusiasts. Log your dives, ask
							the experts, and discover your next underwater adventure.
						</p>
						<div className='grid grid-cols-2 lg:p-8 gap-8'>
							<Button asChild>
								<Link href={'/login'}>Login</Link>
							</Button>
							<Button variant={'secondary'} asChild>
								<Link href={'/signup'}>Signup Now!</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-linear-to-b from-slate-950 to-sky-950 grid grid-cols-1 lg:grid-cols-2 rounded-t-2xl p-8 items-center'>
				<div className=''>
					<h3 className='text-primary text-2xl tracking-widest'>
						Community Forum
					</h3>
					<h2 className='text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight'>
						The Diver&apos;s Forum
					</h2>
					<p className='text-gray-200 text-lg leading-relaxed'>
						Connect with experts and enthusiasts. Get gear advice, find your
						next dive buddy, and share your underwater discoveries in our active
						community.
					</p>
					<Button asChild className='my-4'>
						<Link href='/forum'>Go to Forum</Link>
					</Button>
				</div>
				<div className='flex gap-4 flex-col'>
					<Card className='bg-linear-to-b from-slate-800 to-slate-700 grid border-none text-white'>
						<CardHeader className='flex items-center gap-2'>
							<GiScubaTanks className='text-4xl ' width={20} height={20} />
							<CardTitle className='text-2xl'>Gear Talk</CardTitle>
						</CardHeader>
						<CardContent className='capitalize'>
							Socailize Gear & learn about new upcoming gear
						</CardContent>
					</Card>
					<div className='grid-cols-1 lg:grid-cols-2 grid gap-4'>
						<Card className='bg-linear-to-b from-slate-800 to-slate-700 grid border-none text-white'>
							<CardContent className=''>
								<div className='h-40 overflow-hidden'>
									<Image
										src={okayImage}
										width={600}
										height={190}
										alt='Scuba Swap Dive Talk'
									/>
								</div>
							</CardContent>
							<CardHeader>
								<CardTitle>
									<p>Find New Gear</p>
								</CardTitle>
								<p className='opacity-75 tracking-widest capitalize'>
									Discuss what the vendor don&apos;t want to say 🤡
								</p>
							</CardHeader>
						</Card>
						<Card className='bg-linear-to-b from-slate-800 to-slate-700 grid border-none text-white'>
							<CardContent>
								<div className='h-40 overflow-hidden '>
									<Image
										src={diveBuds}
										width={600}
										height={190}
										alt='Scuba Swap Dive Buddies'
									/>
								</div>
							</CardContent>
							<CardHeader>
								<CardTitle>
									<p>Dive Buddies</p>
								</CardTitle>
								<p className='opacity-75 tracking-widest capitalize'>
									Make new dive buddies from all over the world
								</p>
							</CardHeader>
						</Card>
					</div>
				</div>
			</div>
			<div className='min-h-[50lvh] lg:px-0 px-2'>
				<h3 className='pt-10 pl-4 text-xl font-bold'>Recent Posts!</h3>
				<ForumFeed />
			</div>
		</main>
	);
}
export default page;
