export function Footer({}) {
	return (
		<footer className='w-full bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-border-dark py-12'>
			<div className='layout-container flex justify-center'>
				<div className='max-w-[1280px] w-full px-6 flex flex-col md:flex-row justify-between gap-10'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center gap-2 text-primary'>
							<span className='material-symbols-outlined text-2xl'>
								scuba_diving
							</span>
							<span className='text-[#111618] dark:text-white font-bold text-lg'>
								ScubaMarket
							</span>
						</div>
						<p className='text-[#637588] dark:text-[#9db2b9] text-sm max-w-[300px]'>
							The world&apos;s largest underwater community and marketplace.
						</p>
					</div>
					<div className='flex gap-16 flex-wrap'>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Community
							</h4>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Forum
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Events
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Leaderboard
							</a>
						</div>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Features
							</h4>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Dive Logs
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Marketplace
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Gear Tracker
							</a>
						</div>
						<div className='flex flex-col gap-3'>
							<h4 className='text-[#111618] dark:text-white font-bold text-sm'>
								Support
							</h4>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Help Center
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Safety
							</a>
							<a
								className='text-[#637588] dark:text-[#9db2b9] text-sm hover:text-primary transition-colors'
								href='#'
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className='layout-container flex justify-center mt-12'>
				<div className='max-w-[1280px] w-full px-6 border-t border-gray-200 dark:border-border-dark pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
					<p className='text-[#637588] dark:text-[#5d6c74] text-xs'>
						© 2023 ScubaMarket Inc. All rights reserved.
					</p>
					<div className='flex gap-4 text-[#637588] dark:text-[#5d6c74]'>
						<a className='hover:text-primary transition-colors' href='#'>
							<span className='material-symbols-outlined text-lg'>public</span>
						</a>
						<a className='hover:text-primary transition-colors' href='#'>
							<span className='material-symbols-outlined text-lg'>
								photo_camera
							</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
