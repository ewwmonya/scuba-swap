import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Container from '@/components/globals/Container';
import { Footer } from '@/components/globals/Footer';
import Navbar from '@/components/navbar/Navbar';
import NavbarServer from '@/components/navbar/NavbarServer';
import { Suspense } from 'react';
import Script from 'next/script';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Scuba-Swap',
	description: 'Next Day and Age Scuba Forum',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<Script
				strategy='beforeInteractive'
				src='https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=5b1d16afa62496d744376c3343f4c41d41a4dba9'
			/>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-gray-100`}
			>
				<main className='px-2'>
					<Suspense fallback={'Loading...'}>{children}</Suspense>
				</main>
				<Footer />
			</body>
		</html>
	);
}
