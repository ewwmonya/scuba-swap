'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
function Profile({ name }: { name?: string }) {
	return (
		<>
			<Button
				size={'icon-lg'}
				variant={'ghost'}
				className='bg-orange-100 rounded-full uppercase font-semibold font-mono text-md'
			>
				{name == '' ?
					'YU'
				:	<Image
						className={'rounded-full'}
						src={'https://github.com/shadcn.png'}
						width={200}
						height={200}
						alt='alt'
					/>
				}
			</Button>
		</>
	);
}
export default Profile;
