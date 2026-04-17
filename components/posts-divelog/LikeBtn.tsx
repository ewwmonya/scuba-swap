'use client';
import { MdThumbUpOffAlt } from 'react-icons/md';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
export function LikeBtn({
	postId,
	inintLikesCount,
	currentUserId,
}: {
	postId: string;
	inintLikesCount: number;
	currentUserId: string;
}) {
	const [numbLikes, setNumbLikes] = useState(inintLikesCount);
	const [liked, setLiked] = useState(Boolean);

	const onClick = async () => {
		const data = await fetch('/api/create-like', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ postId, currentUserId }),
		});
		const { liked: currentLikeData, diveLikesCount } = await data.json();
		setLiked(currentLikeData);
		if (liked) {
			setNumbLikes(diveLikesCount);
			setLiked(false);
		} else {
			setNumbLikes(diveLikesCount);
			setLiked(true);
		}
	};

	return (
		<div className=''>
			<Button variant={'link'} onClick={onClick}>
				<MdThumbUpOffAlt /> {numbLikes == 0 ? ' ' : numbLikes}
				{numbLikes <= 1 ? ' Like' : ' Likes'}
			</Button>
		</div>
	);
}
