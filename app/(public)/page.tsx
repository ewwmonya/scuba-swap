import Image from 'next/image';
import hero from '@/public/diver-hero2.jpg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MdOutlineScubaDiving, MdSkateboarding } from 'react-icons/md';
import Link from 'next/link';
import { ForumFeed } from '@/components/forum/ForumFeed';

function page() {
	return (
		<main className='min-h-[90lvh]  '>
			<div className='grid w-full  contain-content my-8'>
				<Image
					src={hero}
					alt=''
					height={400}
					width={726}
					className='w-[1920px] rounded-2xl shadow relative'
				/>
				<div className='absolute place-self-center text-white  grid grid-cols-2 text-center'>
					<p></p>
					<div className='max-w-xl flex flex-col '>
						<div className='flex flex-nowrap gap-2 lg:pl-8 pl-2 justify-center my-4 '>
							<MdOutlineScubaDiving
								className='text-5xl '
								width={20}
								height={20}
							/>
							<h1 className='lg:text-5xl font-bold'>ScubaSwap</h1>
						</div>
						<p className='font-semibold tracking-wider mb-4'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
							officia repellendus sed, culpa magni temporibus vero vitae iste
							fuga asperiores error, fugiat amet! Distinctio reprehenderit
							corporis debitis suscipit? Repellendus, officia.
						</p>
						<div className='grid grid-cols-2 p-8 gap-8'>
							<Button>Button One</Button>
							<Button variant={'secondary'}>Button Two</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-linear-to-b from-slate-950 to-sky-950 grid grid-cols-1 lg:grid-cols-2 rounded-t-2xl p-8'>
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
							<MdSkateboarding className='text-3xl ' width={20} height={20} />
							<CardTitle className='text-2xl'>Gear Talk</CardTitle>
						</CardHeader>
						<CardContent>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						</CardContent>
					</Card>
					<div className='flex gap-4'>
						<Card className='bg-linear-to-b from-slate-800 to-slate-700 grid border-none text-white'>
							<CardContent>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							</CardContent>
						</Card>
						<Card className='bg-linear-to-b from-slate-800 to-slate-700 grid border-none text-white'>
							<CardContent>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className='min-h-[50lvh]'>
				<ForumFeed />
			</div>
		</main>
	);
}
export default page;
