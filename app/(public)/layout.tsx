import Container from '@/components/globals/Container';
import Navbar from '@/components/navbar/Navbar';
import { ReactNode } from 'react';

export default async function PublicLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<Navbar view={false} />
			<Container>{children}</Container>
		</>
	);
}
