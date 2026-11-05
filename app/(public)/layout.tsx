import Container from '@/components/globals/Container';
import NavbarServer from '@/components/navbar/NavbarServer';
import Script from 'next/script';
import { ReactNode } from 'react';

export default async function PublicLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<NavbarServer />
			<Container className='m-auto'>{children}</Container>
		</>
	);
}
