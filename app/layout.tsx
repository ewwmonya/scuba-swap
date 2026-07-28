import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Container from '@/components/globals/Container';
import { Footer } from '@/components/globals/Footer';
import Navbar from '@/components/navbar/Navbar';
import NavbarServer from '@/components/navbar/NavbarServer';
import { Suspense } from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL || 'https://scuba-swap.vercel.app'
).replace(/\/$/, '');

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'Scuba Traders',
		template: '%s | Scuba Traders',
	},
	description:
		'A social community for scuba divers to share dive logs, discuss gear, and connect with other divers.',
	verification: {
		google: 'MG6iiaxhipyuKTPbXa3WMYKPhZ2Bx_rj_M-oUr8kWZA',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
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
