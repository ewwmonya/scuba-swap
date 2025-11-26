import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PiPersonSimpleSwimDuotone } from 'react-icons/pi';
function page() {
	return (
		<div className='grid place-content-center  min-h-[60vh]'>
			<p className='text-8xl text-slate-800 flex justify-center'>
				404
				<span className='text-primary'>
					<PiPersonSimpleSwimDuotone />
				</span>
			</p>
			<p className='text-3xl text-slate-800'>
				Looks Like you&apos;re lost, Just Keep Swimming.
			</p>
			<div className='flex justify-end mt-8 '>
				<Link href={'/'} className='hover:cursor-pointer'>
					<Button variant={'default'}>Swim Home</Button>
				</Link>
			</div>
		</div>
	);
}
export default page;
