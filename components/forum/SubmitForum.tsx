'use client';

import PostAvatar from '@/components/posts-divelog/PostAvatar';
import { Label } from '@/components/ui/label';
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
import { redirect } from 'next/navigation';
import { useState } from 'react';

const forumPostSchema = z.object({
	caption: z.string().min(1, 'Please Enter a Caption'),
	content: z.string().min(1, 'Please Enter Some Content Diver'),
});

export function SubmitForum({}) {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitted },
		formState,
		reset,
	} = useForm<z.input<typeof forumPostSchema>>({
		resolver: zodResolver(forumPostSchema),
	});

	const onSubmit = async (values: z.input<typeof forumPostSchema>) => {
		const storedData = localStorage.getItem(
			'sb-vbfnfpmvijwoxuabvyyr-auth-token'
		);
		const userEmail = JSON.parse(storedData as string)?.user?.email;
		const res = await fetch('/api/create-forum', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userEmail, values }),
		});
		const data = res;
		console.log(data);
		reset({ caption: '' });
		reset({ content: '' });
		redirect('/forum');
	};
	const [captionCount, setCaptionCount] = useState(0);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card>
				<CardContent>
					<div className='flex gap-4'>
						<PostAvatar src='https://github.com/shadcn.png' />
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
						<Button>Post</Button>
					</CardAction>
				</CardFooter>
			</Card>
		</form>
	);
}
