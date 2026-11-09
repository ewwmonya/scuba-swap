import Container from '@/components/globals/Container';
import { Footer } from '@/components/globals/Footer';
import NavbarServer from '@/components/navbar/NavbarServer';

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
			<Footer />
		</>
	);
}
