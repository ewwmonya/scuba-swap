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
				{name !== undefined ? name.slice(0, 2) : 'YU'}
			</Button>
		</>
	);
}
export default Profile;
