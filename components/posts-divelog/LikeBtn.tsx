'use client';

import { Heart } from 'lucide-react';
import { useRef, useState } from 'react';

export function LikeBtn({
	postId,
	initialCount,
	initiallyLiked,
	currentUserId,
}: {
	postId: string;
	initialCount: number;
	initiallyLiked: boolean;
	currentUserId: string;
}) {
	const [count, setCount] = useState(initialCount);
	const [liked, setLiked] = useState(initiallyLiked);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const requestInProgress = useRef(false);

	async function toggleLike() {
		if (requestInProgress.current) return;

		requestInProgress.current = true;
		setPending(true);
		setError(false);

		try {
			const response = await fetch('/api/create-like', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ postId, currentUserId }),
			});
			if (!response.ok) throw new Error('Could not update like');

			const { liked: wasLiked, diveLikesCount } = await response.json();
			setLiked(!wasLiked);
			setCount(diveLikesCount);
		} catch {
			setError(true);
		} finally {
			requestInProgress.current = false;
			setPending(false);
		}
	}

	return (
		<span className='inline-flex flex-wrap items-center gap-2'>
			<button
				type='button'
				aria-label={`Like dive, ${count} ${count === 1 ? 'like' : 'likes'}`}
				aria-pressed={liked}
				disabled={pending}
				onClick={toggleLike}
				className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-semibold tabular-nums text-slate-700 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-60'
			>
				<Heart
					aria-hidden='true'
					className={liked ? 'size-5 fill-current text-rose-600' : 'size-5'}
				/>
				{count}
			</button>
			{error && (
				<span role='status' className='text-xs text-rose-700'>
					Could not update like. Try again.
				</span>
			)}
		</span>
	);
}
