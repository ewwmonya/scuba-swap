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

const forumPostSchema = z.object({
	caption: z.string().min(1, 'Please Enter a Caption'),
	content: z.string().min(1, 'Please Enter Some Content Diver'),
});

export function SubmitForum({}) {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
		getValues,
		reset,
	} = useForm<z.input<typeof forumPostSchema>>({
		resolver: zodResolver(forumPostSchema),
		// Need to add api route here
	});

	async function onSubmit() {
		const { caption, content } = getValues();
		await fetch('/api/create-forum', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ caption, content }),
		});
		reset({ content });
		reset({ caption });
		redirect('/forum');
	}

	const [captionCount, setCaptionCount] = useState(0);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<CardContent>
					<div className='flex gap-4'>
						{/* <PostAvatar src='https://github.com/shadcn.png' /> */}
						<div className='w-full '>
							<div className='flex gap-4 overflow-hidden items-center'>
								<Input
									{...register('caption')}
									onChange={(e) => {
										setCaptionCount(e.target.value.length);
									}}
									minLength={10}
									maxLength={200}
									id='caption'
									type='text'
									className='lg:w-sm my-4'
									placeholder='Place Caption Here'
									autoComplete='off'
								/>
								<p className='text-xs text-gray-400'>{captionCount}/200</p>
							</div>
							<Textarea
								minLength={10}
								{...register('content')}
								className='resize-none h-30'
								placeholder='Type your message here.'
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<CardAction className=' flex justify-end w-full'>
						<Button type='submit' disabled={isSubmitting}>
							Post
						</Button>
					</CardAction>
				</CardFooter>
			</Card>
		</form>
	);
}
