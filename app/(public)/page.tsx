function page() {
	return (
		<>
			<div className='relative flex h-auto min-h-screen w-full flex-col'>
				{/* Hero Section */}
				<section className='relative w-full'>
					<div className='layout-container flex flex-col items-center'>
						<div className='w-full  py-8 max-w-[1440px]'>
							<div
								className='relative flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center  overflow-hidden group'
								data-alt='Diver exploring a vibrant coral reef with sun rays penetrating the water'
							>
								{/* Decorative glow */}
								<div className='absolute top-0 left-0 w-full h-full bg-slate-400 opacity-40'></div>
								<div className='relative z-10 flex flex-col gap-6 text-center max-w-3xl'>
									<h1 className='text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg'>
										Dive Deeper{' '}
										<span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-200'>
											Together
										</span>
									</h1>
									<h2 className='text-gray-200 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md'>
										The ultimate community for scuba enthusiasts. Log your
										dives, ask the experts, and discover your next underwater
										adventure.
									</h2>
								</div>
								<div className='relative z-10 flex flex-wrap gap-4 justify-center mt-4'>
									<button className='flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-[#101d22] text-base font-bold shadow-lg hover:scale-105 transition-transform'>
										<span>Join the Community</span>
									</button>
									<button className='flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-[#1c2427]/80 backdrop-blur-sm border border-white/20 text-white text-base font-bold hover:bg-[#1c2427] transition-all'>
										<span>Explore Dive Logs</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Feature Section: Forum */}
				<section className='py-16 md:py-24 w-full bg-background-light dark:bg-background-dark'>
					<div className='layout-container flex justify-center'>
						<div className='layout-content-container flex flex-col max-w-[1280px] w-full px-6 md:px-10 lg:px-20'>
							<div className='flex flex-col lg:flex-row gap-16 items-center'>
								{/* Text Content */}
								<div className='flex flex-col gap-6 flex-1'>
									<div className='flex items-center gap-2 text-primary font-bold tracking-wider text-sm uppercase'>
										<span className='material-symbols-outlined text-lg'>
											forum
										</span>
										<span>Community Forum</span>
									</div>
									<h2 className='text-[#111618] dark:text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight'>
										The Diver&apos;s Forum
									</h2>
									<p className='text-[#637588] dark:text-[#9db2b9] text-lg leading-relaxed'>
										Connect with experts and enthusiasts. Get gear advice, find
										your next dive buddy, and share your underwater discoveries
										in our active community.
									</p>
									<div className='pt-4'>
										<button className='flex w-fit cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-[#111618] text-sm font-bold shadow-md hover:brightness-110 transition-all'>
											<span>Go to Forum</span>
										</button>
									</div>
								</div>
								{/* Visual Grid */}
								<div className='flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div className='col-span-1 sm:col-span-2 bg-[#1c2427] dark:bg-[#1c2427] p-4 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors group cursor-pointer'>
										<div className='flex items-start gap-4'>
											<div
												className='w-16 h-16 rounded-lg bg-cover bg-center shrink-0'
												data-alt='Close up of scuba regulator and mask'
											></div>
											<div className='flex flex-col'>
												<h3 className='text-white font-bold text-lg group-hover:text-primary transition-colors'>
													Gear Talk
												</h3>
												<p className='text-[#9db2b9] text-sm'>
													Discussions on regulators, BCDs, and computers.
												</p>
												<span className='text-xs text-[#9db2b9] mt-2'>
													124 active threads
												</span>
											</div>
										</div>
									</div>
									<div className='bg-[#1c2427] dark:bg-[#1c2427] p-4 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors group cursor-pointer'>
										<div
											className='h-32 w-full rounded-lg bg-cover bg-center mb-3'
											data-alt='Two divers signaling ok to each other'
										></div>
										<h3 className='text-white font-bold group-hover:text-primary transition-colors'>
											Dive Buddies
										</h3>
										<p className='text-[#9db2b9] text-xs'>
											Find partners near you.
										</p>
									</div>
									<div className='bg-[#1c2427] dark:bg-[#1c2427] p-4 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors group cursor-pointer'>
										<div
											className='h-32 w-full rounded-lg bg-cover bg-center mb-3'
											data-alt='Diver looking at a large sea turtle'
										></div>
										<h3 className='text-white font-bold group-hover:text-primary transition-colors'>
											Expert Advice
										</h3>
										<p className='text-[#9db2b9] text-xs'>
											Q&amp;A with instructors.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Feature Section: Dive Logs */}
				<section className='py-16 md:py-24 w-full bg-[#eef2f3] dark:bg-[#0d161a]'>
					<div className='layout-container flex justify-center'>
						<div className='layout-content-container flex flex-col max-w-[1280px] w-full px-6 md:px-10 lg:px-20'>
							<div className='flex flex-col lg:flex-row-reverse gap-16 items-center'>
								{/* Text Content */}
								<div className='flex flex-col gap-6 flex-1'>
									<div className='flex items-center gap-2 text-primary font-bold tracking-wider text-sm uppercase'>
										<span className='material-symbols-outlined text-lg'>
											history_edu
										</span>
										<span>Digital Logbook</span>
									</div>
									<h2 className='text-[#111618] dark:text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight'>
										Visualize Your Journey
									</h2>
									<p className='text-[#637588] dark:text-[#9db2b9] text-lg leading-relaxed'>
										Keep a detailed log of every dive. Track your depth,
										location, and marine life sightings with our advanced
										digital dive log.
									</p>
									<div className='pt-4'>
										<button className='flex w-fit cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-background-dark dark:bg-white text-white dark:text-[#111618] text-sm font-bold shadow-md hover:bg-black dark:hover:bg-gray-200 transition-all'>
											<span>Start Logging</span>
										</button>
									</div>
								</div>
								{/* Features Grid */}
								<div className='flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div className='sm:col-span-2 flex gap-4 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-[#1c2427] p-6 shadow-sm hover:shadow-md transition-shadow'>
										<div className='text-primary p-3 bg-primary/10 rounded-lg h-fit'>
											<span className='material-symbols-outlined text-3xl'>
												map
											</span>
										</div>
										<div className='flex flex-col gap-2'>
											<h3 className='text-[#111618] dark:text-white text-lg font-bold'>
												Interactive Maps
											</h3>
											<p className='text-[#637588] dark:text-[#9db2b9] text-sm leading-normal'>
												Pinpoint exact dive sites with GPS coordinates. Explore
												sites visited by other community members around the
												globe.
											</p>
										</div>
									</div>
									<div className='flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-[#1c2427] p-6 shadow-sm hover:shadow-md transition-shadow'>
										<div className='text-primary p-3 bg-primary/10 rounded-lg w-fit'>
											<span className='material-symbols-outlined text-3xl'>
												bar_chart
											</span>
										</div>
										<div className='flex flex-col gap-1'>
											<h3 className='text-[#111618] dark:text-white text-base font-bold'>
												Depth Charts
											</h3>
											<p className='text-[#637588] dark:text-[#9db2b9] text-sm'>
												Visual depth profiles for every session.
											</p>
										</div>
									</div>
									<div className='flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-[#1c2427] p-6 shadow-sm hover:shadow-md transition-shadow'>
										<div className='text-primary p-3 bg-primary/10 rounded-lg w-fit'>
											<span className='material-symbols-outlined text-3xl'>
												set_meal
											</span>
										</div>
										<div className='flex flex-col gap-1'>
											<h3 className='text-[#111618] dark:text-white text-base font-bold'>
												Marine Tagging
											</h3>
											<p className='text-[#637588] dark:text-[#9db2b9] text-sm'>
												Catalog species seen and build your bio-dex.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Community Feed / Recent Activity */}
				<section className='py-16 md:py-24 w-full bg-background-light dark:bg-background-dark'>
					<div className='layout-container flex justify-center'>
						<div className='layout-content-container flex flex-col max-w-[1280px] w-full px-6 md:px-10 lg:px-20'>
							<div className='flex justify-between items-end mb-10'>
								<div className='flex flex-col gap-2'>
									<h2 className='text-[#111618] dark:text-white text-2xl md:text-3xl font-bold leading-tight'>
										Recent Community Activity
									</h2>
									<p className='text-[#637588] dark:text-[#9db2b9]'>
										See what divers are discovering right now.
									</p>
								</div>
								<a
									className='hidden sm:flex text-primary font-bold text-sm items-center gap-1 hover:underline'
									href='#'
								>
									View Feed{' '}
									<span className='material-symbols-outlined text-sm'>
										arrow_forward
									</span>
								</a>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
								{/* Feed Item 1 */}
								<div className='group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#1c2427] border border-gray-200 dark:border-border-dark hover:border-primary/50 transition-all shadow-sm'>
									<div
										className='relative h-48 w-full bg-cover bg-center'
										data-alt='Colorful nudibranch on a rock'
									>
										<div className='absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-white text-xs font-medium'>
											<span className='material-symbols-outlined text-[14px]'>
												visibility
											</span>{' '}
											240
										</div>
									</div>
									<div className='p-4 flex flex-col gap-3'>
										<div className='flex items-center gap-2'>
											<div className='size-8 rounded-full bg-gray-300 bg-cover bg-center'></div>
											<div className='flex flex-col'>
												<span className='text-xs font-bold text-[#111618] dark:text-white'>
													Sarah Jenkins
												</span>
												<span className='text-[10px] text-[#637588] dark:text-[#9db2b9]'>
													2 hours ago
												</span>
											</div>
										</div>
										<h3 className='text-sm font-bold text-[#111618] dark:text-white truncate'>
											Night dive at Blue Hole
										</h3>
										<div className='flex gap-2 mt-auto'>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													arrow_downward
												</span>{' '}
												24m
											</span>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													schedule
												</span>{' '}
												45m
											</span>
										</div>
									</div>
								</div>
								{/* Feed Item 2 */}
								<div className='group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#1c2427] border border-gray-200 dark:border-border-dark hover:border-primary/50 transition-all shadow-sm'>
									<div
										className='relative h-48 w-full bg-cover bg-center'
										data-alt='School of barracuda fish'
									>
										<div className='absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-white text-xs font-medium'>
											<span className='material-symbols-outlined text-[14px]'>
												visibility
											</span>{' '}
											85
										</div>
									</div>
									<div className='p-4 flex flex-col gap-3'>
										<div className='flex items-center gap-2'>
											<div className='size-8 rounded-full bg-gray-300 bg-cover bg-center'></div>
											<div className='flex flex-col'>
												<span className='text-xs font-bold text-[#111618] dark:text-white'>
													Mike Ross
												</span>
												<span className='text-[10px] text-[#637588] dark:text-[#9db2b9]'>
													5 hours ago
												</span>
											</div>
										</div>
										<h3 className='text-sm font-bold text-[#111618] dark:text-white truncate'>
											Sipadan Barracuda Point
										</h3>
										<div className='flex gap-2 mt-auto'>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													arrow_downward
												</span>{' '}
												18m
											</span>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													schedule
												</span>{' '}
												52m
											</span>
										</div>
									</div>
								</div>
								{/* Feed Item 3 */}
								<div className='group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#1c2427] border border-gray-200 dark:border-border-dark hover:border-primary/50 transition-all shadow-sm'>
									<div
										className='relative h-48 w-full bg-cover bg-center'
										data-alt='Map of Indonesia showing a dive location pin'
										data-location='Indonesia'
									>
										<div className='absolute inset-0 flex items-center justify-center'>
											<div className='bg-primary/90 text-[#111618] rounded-full p-2'>
												<span className='material-symbols-outlined'>
													location_on
												</span>
											</div>
										</div>
									</div>
									<div className='p-4 flex flex-col gap-3'>
										<div className='flex items-center gap-2'>
											<div className='size-8 rounded-full bg-gray-300 bg-cover bg-center'></div>
											<div className='flex flex-col'>
												<span className='text-xs font-bold text-[#111618] dark:text-white'>
													Elena Fisher
												</span>
												<span className='text-[10px] text-[#637588] dark:text-[#9db2b9]'>
													1 day ago
												</span>
											</div>
										</div>
										<h3 className='text-sm font-bold text-[#111618] dark:text-white truncate'>
											Raja Ampat Discovery
										</h3>
										<div className='flex gap-2 mt-auto'>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													arrow_downward
												</span>{' '}
												30m
											</span>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													schedule
												</span>{' '}
												60m
											</span>
										</div>
									</div>
								</div>
								{/* Feed Item 4 */}
								<div className='group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#1c2427] border border-gray-200 dark:border-border-dark hover:border-primary/50 transition-all shadow-sm'>
									<div
										className='relative h-48 w-full bg-cover bg-center'
										data-alt='Diver exploring a shipwreck underwater'
									>
										<div className='absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-white text-xs font-medium'>
											<span className='material-symbols-outlined text-[14px]'>
												visibility
											</span>{' '}
											1.2k
										</div>
									</div>
									<div className='p-4 flex flex-col gap-3'>
										<div className='flex items-center gap-2'>
											<div className='size-8 rounded-full bg-gray-300 bg-cover bg-center'></div>
											<div className='flex flex-col'>
												<span className='text-xs font-bold text-[#111618] dark:text-white'>
													Tom Hardy
												</span>
												<span className='text-[10px] text-[#637588] dark:text-[#9db2b9]'>
													2 days ago
												</span>
											</div>
										</div>
										<h3 className='text-sm font-bold text-[#111618] dark:text-white truncate'>
											USAT Liberty Wreck
										</h3>
										<div className='flex gap-2 mt-auto'>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													arrow_downward
												</span>{' '}
												22m
											</span>
											<span className='px-2 py-1 rounded bg-background-light dark:bg-background-dark text-[10px] text-[#637588] dark:text-[#9db2b9] border border-gray-200 dark:border-border-dark flex items-center gap-1'>
												<span className='material-symbols-outlined text-[10px]'>
													schedule
												</span>{' '}
												38m
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* CTA Section */}
				<section className='py-16 w-full border-t border-gray-200 dark:border-border-dark bg-[#eef2f3] dark:bg-[#0d161a]'>
					<div className='layout-container flex justify-center text-center'>
						<div className='layout-content-container flex flex-col max-w-[800px] w-full px-6 gap-8 items-center'>
							<h2 className='text-[#111618] dark:text-white text-3xl md:text-4xl font-bold leading-tight'>
								Ready to join the crew?
							</h2>
							<p className='text-[#637588] dark:text-[#9db2b9] text-lg max-w-[600px]'>
								Create your free account today to start logging dives, tagging
								marine life, and connecting with buddies worldwide.
							</p>
							<div className='flex gap-4'>
								<button className='flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-[#111618] text-base font-bold shadow-lg hover:shadow-cyan-500/30 transition-shadow'>
									Sign Up Free
								</button>
								<button className='flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-white dark:bg-[#283539] border border-gray-200 dark:border-transparent text-[#111618] dark:text-white text-base font-bold hover:bg-gray-50 dark:hover:bg-[#324247] transition-colors'>
									Log In
								</button>
							</div>
						</div>
					</div>
				</section>
				{/* Footer */}
			</div>
		</>
	);
}
export default page;
