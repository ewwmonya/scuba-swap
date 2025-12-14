import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<>
			<Breadcrumb className='my-8'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Components</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='flex-1 mb-4'>
				<div className='p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm'>
					<div className='flex items-center gap-3'>
						<div>
							<p className='font-bold text-slate-800 dark:text-white'>
								DiveMasterDave
							</p>
							<p className='text-sm text-slate-500 dark:text-slate-400'>
								Posted 2 hours ago
							</p>
						</div>
					</div>
					<h1 className='mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white'>
						Best BCD for travel? Looking for lightweight options!
					</h1>
					<div className='mt-4 space-y-4 text-slate-600 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none'>
						<p>Hey fellow divers,</p>
						<p>
							I&apos;m planning a trip to Indonesia and I&apos;m tired of
							lugging my heavy BCD around airports and paying extra for baggage
							fees. I&apos;m looking for recommendations for a solid,
							lightweight travel BCD.
						</p>
						<p>My priorities are:</p>
						<ul className='list-disc pl-5'>
							<li>
								<strong>Lightweight &amp; Packable:</strong> Needs to be easy to
								fold or roll up.
							</li>
							<li>
								<strong>Durable:</strong> Don&apos;t want something that will
								fall apart after a few trips.
							</li>
							<li>
								<strong>Comfortable:</strong> Good fit, minimal ride-up.
							</li>
						</ul>
						<p>
							I&apos;ve been looking at the Aqua Lung Zuma and the Scubapro
							Litehawk, but I&apos;m open to other suggestions. What are you all
							using for your dive travels? Any pros/cons I should be aware of?
							Thanks in advance!
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
export default page;
