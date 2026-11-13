'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

export function ShareDive({ href }: { href: string }) {
	const [status, setStatus] = useState('');

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(
				new URL(href, window.location.origin).href,
			);
			setStatus('Link copied');
		} catch {
			setStatus('Could not copy link');
		}
	}

	return (
		<span className='inline-flex flex-wrap items-center gap-1'>
			<button
				type='button'
				onClick={copyLink}
				aria-label='Copy dive link'
				className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700'
			>
				<Share2 aria-hidden='true' className='size-5' />
				<span>Share</span>
			</button>
			<span role='status' className='text-xs text-slate-700'>
				{status}
			</span>
		</span>
	);
}
