import { Button } from '../ui/button';
import Image from 'next/image';
import { prisma } from '@/lib/prismaActions';

function Profile({ src }: { src?: string }) {
	return <Button variant={'outline'}>{src}</Button>;
}
export default Profile;
