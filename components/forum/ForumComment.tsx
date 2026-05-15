'use client';

import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { redirect } from 'next/navigation';

const forumCommentSchema = z.object({
	comment: z.string().min(1, 'Please Enter a Comment'),
});

export function ForumComment({ postId }: { postId: string }) {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
		getValues,
		reset,
	} = useForm<z.input<typeof forumCommentSchema>>({
		resolver: zodResolver(forumCommentSchema),
		// Need to add api route here
	});

	async function onSubmit() {
		const { comment } = getValues();
		const commentData = await fetch('/api/create-comment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment, postId }),
		});
		const { id } = await commentData.json();
		reset({ comment });
		redirect(`#${id}`);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<CardContent>
					<div className='flex gap-4'>
						{/* <PostAvatar src='https://github.com/shadcn.png' /> */}
						<div className='w-full '>
							<Textarea
								minLength={10}
								{...register('comment')}
								className='resize-none h-30'
								placeholder='Want to leave a comment?'
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<CardAction className=' flex justify-end w-full'>
						<Button type='submit' disabled={isSubmitting}>
							Comment
						</Button>
					</CardAction>
				</CardFooter>
			</Card>
		</form>
	);
}
