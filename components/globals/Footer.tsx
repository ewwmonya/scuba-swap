import Link from 'next/link';
import { MdOutlineScubaDiving } from 'react-icons/md';

export function Footer({}) {
	return (
		<footer className='w-full bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-border-dark py-12'>
			<div className='layout-container flex justify-center'>
				<div className='max-w-[1170px] w-full px-6 flex flex-col md:flex-row justify-between gap-10'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center gap-2 text-primary'>
							<Link href={'/'} className='flex flex-nowrap gap-2 lg:pl-8 pl-2'>
								<MdOutlineScubaDiving
									className='text-3xl text-slate-800 '
									width={20}
									height={20}
								/>
								<h1 className='lg:text-xl text-slate-800 font-bold'>
									ScubaSwap
								</h1>
							</Link>
						</div>
						<p className='text-[#637588] dark:text-[#9db2b9] text-sm max-w-[300px]'>
							The world&apos;s Newest underwater community and future
							marketplace.
						</p>
						<p className='text-xs tracking-widest text-gray-300'>
							Like for real I just launched this in January
						</p>
					</div>
					<div className='flex gap-16 flex-wrap'>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Community
							</h4>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Forum
							</Link>
							{/* <Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Events
							</Link>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Leaderboard
							</Link>
						</div>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Features
							</h4>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Dive Logs
							</Link>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Marketplace
							</Link>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Gear Tracker
							</Link>
						</div>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Support
							</h4>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Help Center
							</Link>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Safety
							</Link>
							<Link
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Contact
							</Link>
							*/}
						</div>
					</div>
				</div>
			</div>
			<div className='layout-container flex justify-center mt-12'>
				<div className='max-w-[1280px] w-full px-6 border-t border-gray-200 dark:border-border-dark pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
					<p className='text-[#637588] dark:text-[#5d6c74] text-xs'>
						©2026 Scuba-Swap All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
