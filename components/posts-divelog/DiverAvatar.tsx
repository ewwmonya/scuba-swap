import Image from 'next/image';

export function diveImageSource(value?: string | null) {
	const source = value?.trim();
	if (source?.startsWith('/') && !/^\/[\/\\]/.test(source)) return source;

	try {
		const url = new URL(source ?? '');
		if (url.protocol === 'https:' && !url.username && !url.password)
			return url.href;
	} catch {
		// Older logs may contain an empty or invalid image path.
	}

	return undefined;
}

export function DiverAvatar({
	username,
	url,
	size = 48,
}: {
	username: string;
	url?: string | null;
	size?: 36 | 48;
}) {
	const source = diveImageSource(url);

	return (
		<span
			aria-hidden='true'
			className='relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-sm font-semibold text-sky-800 ring-2 ring-slate-100'
			style={{ width: size, height: size }}
		>
			{username.replace(/^@/, '').slice(0, 2).toUpperCase()}
			{source && (
				<Image
					src={source}
					alt=''
					fill
					sizes={`${size}px`}
					unoptimized
					className='object-cover'
				/>
			)}
		</span>
	);
}
