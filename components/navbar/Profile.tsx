'use client';

import { Button } from '../ui/button';
import Image from 'next/image';

function Profile({ src }: { src?: string }) {
	const storedData = localStorage.getItem('sb-vbfnfpmvijwoxuabvyyr-auth-token');
	const userINT = JSON.parse(storedData as string);

	return (
		<>
			<Button
				size={'icon-lg'}
				variant={'ghost'}
				className='bg-orange-100 rounded-full uppercase font-semibold font-mono text-md'
			>
				{src !== undefined ? (
					<Image
						className='rounded-full'
						src={'https://github.com/shadcn.png'}
						width={200}
						height={200}
						alt=''
					/>
				) : (
					userINT.user.email.slice(0, 2)
				)}
			</Button>
		</>
	);
}
export default Profile;
