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
			<Container>{children}</Container>
			<Script
				strategy='beforeInteractive'
				src='https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=5b1d16afa62496d744376c3343f4c41d41a4dba9'
			/>
		</>
	);
}
