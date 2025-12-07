'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { DialogClose, DialogFooter } from '../ui/dialog';

type FieldName = keyof z.infer<typeof diveLogSchema>;

type dataInputs = {
	name: FieldName;
	type: HTMLInputTypeAttribute;
};

const dataInputs: dataInputs[] = [
	{ name: 'dive_number', type: 'number' },
	{ name: 'location', type: 'text' },
	{ name: 'dive_date', type: 'date' },
	{ name: 'maximum_depth', type: 'number' },
	{ name: 'bottom_time', type: 'number' },
	{ name: 'content', type: 'text' },
];

export const diveLogSchema = z.object({
	dive_number: z.coerce.number().min(1, 'Dive number is required'),
	location: z.string().min(1, 'Location is required'),
	dive_date: z.string().min(1, 'Dive date is required'),
	maximum_depth: z.coerce.number().min(1, 'Max depth is required'),
	bottom_time: z.coerce.number().min(1, 'Bottom time is required'),
	content: z.string().min(1, 'Content is required'),
});

function PostSubmit() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.input<typeof diveLogSchema>>({
		resolver: zodResolver(diveLogSchema),
	});

	const onSubmit = async (values: z.input<typeof diveLogSchema>) => {
		console.log('Validated form:', { data: values });

		const res = await fetch('/api/create-log', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});

		const data = res;
		console.log('API response:', data);
		redirect('/feed');
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-4'>
					<div className='grid gap-3 grid-cols-1 lg:grid-cols-4'>
						{dataInputs.map((i) => {
							const textSplit = i.name.replace('_', ' ');
							return (
								<div className='grid gap-3 ' key={i.name}>
									<label htmlFor={textSplit} className='capitalize'>
										{textSplit}
									</label>
									<Input {...register(i.name)} id={textSplit} type={i?.type} />
								</div>
							);
						})}
					</div>

					<DialogFooter className='flex justify-end flex-col'>
						<DialogClose asChild className='my-12'>
							<Button type='submit'>Post Log</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type='button' variant={'outline'}>
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</form>
		</>
	);
}
export default PostSubmit;
