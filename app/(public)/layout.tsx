import Container from '@/components/globals/Container';
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
			<Container>{children}</Container>
		</>
	);
}
