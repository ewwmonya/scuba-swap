import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'earthdata.nasa.gov',
				port: '',
				pathname: '/**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/forum/category',
				destination: '/forum?page=1',
				permanent: true,
			},
			{
				source: '/category/:path*',
				destination: '/forum',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
