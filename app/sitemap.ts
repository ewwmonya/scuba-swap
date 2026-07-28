import type { MetadataRoute } from 'next';

const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL || 'https://scuba-swap.vercel.app'
).replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['', '/about', '/feed', '/login', '/signup'];

	return routes.map((route) => ({
		url: `${siteUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: route === '' || route === '/feed' ? 'daily' : 'monthly',
		priority: route === '' ? 1 : route === '/feed' ? 0.9 : 0.6,
	}));
}
