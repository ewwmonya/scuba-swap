export const mockPosts = [
	{
		id: '1',
		user: {
			name: 'Jake Summers',
			avatar: 'https://picsum.photos/seed/profile6/400/400',
		},
		image: 'https://picsum.photos/seed/dive1/800/500',
		caption:
			'Caught this sunrise dive in Key Largo 🌅 — 80ft visibility and calm seas all morning.',
		likes: 42,
		comments: [
			{ id: 'c1', user: 'Maya', text: 'That water looks unreal!' },
			{ id: 'c2', user: 'Eric', text: 'Jealous — perfect morning for it.' },
		],
		category: 'Travel',
		location: 'Key Largo, Florida',
		createdAt: '2h ago',
	},
	{
		id: '2',
		user: {
			name: 'Lena Wu',
			avatar: 'https://picsum.photos/seed/profile4/400/400',
		},
		image: 'https://picsum.photos/seed/dive2/800/500',
		caption:
			'First wreck dive today! The old tugboat was covered in life — octopus, coral, and even a small reef shark 🦈',
		likes: 65,
		comments: [
			{ id: 'c3', user: 'Sam', text: 'Wreck dives are my favorite too!' },
		],
		category: 'Wreck Dive',
		location: 'Pompano Beach, Florida',
		createdAt: '5h ago',
	},
	{
		id: '3',
		user: {
			name: 'Andre Wilson',
			avatar: 'https://picsum.photos/seed/profile3/400/400',
		},
		image: 'https://picsum.photos/seed/dive3/800/500',
		caption:
			'Testing out my new GoPro setup. Still dialing in the white balance but the footage came out solid!',
		likes: 28,
		comments: [],
		category: 'Gear',
		location: 'La Jolla Shores, California',
		createdAt: '1d ago',
	},
	{
		id: '4',
		user: {
			name: 'Sofia Lopez',
			avatar: 'https://picsum.photos/seed/profile1/400/400',
		},
		image: 'https://picsum.photos/seed/dive4/800/500',
		caption:
			'Nothing beats a shallow reef drift — the current carried us for a mile and it felt like flying.',
		likes: 90,
		comments: [
			{ id: 'c4', user: 'Tommy', text: 'Drift dives are pure freedom 😎' },
			{ id: 'c5', user: 'Jess', text: 'That looks like Roatan — is it?' },
		],
		category: 'Reef',
		location: 'Roatán, Honduras',
		createdAt: '1d ago',
	},
	{
		id: '5',
		user: {
			name: 'Marcus Lee',
			avatar: 'https://picsum.photos/seed/profile2/400/400',
		},
		image: 'https://picsum.photos/seed/dive5/800/500',
		caption:
			'Night dive at Blue Heron Bridge. Spotted three octos and a seahorse — definitely worth the late start.',
		likes: 54,
		comments: [{ id: 'c6', user: 'Riley', text: 'Seahorses?! Lucky find!' }],
		category: 'Night Dive',
		location: 'Blue Heron Bridge, Florida',
		createdAt: '2d ago',
	},
];
