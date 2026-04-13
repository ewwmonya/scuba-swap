'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
type FieldName = keyof z.infer<typeof diveLogSchema>;

type dataInputs = {
	name: FieldName;
	type: HTMLInputTypeAttribute;
	max?: number;
	min?: number;
};

const dataInputs: dataInputs[] = [
	{ name: 'dive_number', type: 'number' },
	{ name: 'dive_date', type: 'date' },
	{ name: 'location', type: 'text' },
	{ name: 'water_temperature_surface', type: 'number', max: 101, min: 27 },
	{ name: 'entry_time', type: 'time' },
	{ name: 'exit_time', type: 'time' },
	{ name: 'maximum_depth', type: 'number', min: 15, max: 333 },
	{ name: 'bottom_time', type: 'number' },
	{ name: 'content', type: 'text' },
];

export const diveLogSchema = z.object({
	dive_number: z.coerce.number().min(1, 'Dive number is required'),
	location: z.string().min(1, 'Location is required'),
	water_temperature_surface: z
		.string()
		?.min(1, 'water temperature between 27Fº - 101º is required '),
	dive_date: z.string().min(1, 'Dive date is required'),
	entry_time: z.string().min(1, 'Dive entry_time is required'),
	exit_time: z.string().min(1, 'Dive exit_time is required'),
	maximum_depth: z.coerce.number().min(1, 'Max depth is required'),
	bottom_time: z.coerce.string().min(1, 'Bottom time is required'),
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
		const res = await fetch('/api/create-log', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ values }),
		});
		console.log(res);
		// if(res.status == ){}
		// redirect('/feed');

		// const data = res;
		console.log(res);
	};

	return (
		<>
			<ScrollArea className='h-[90vh] lg:h-auto px-4'>
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
										<Input
											{...register(i.name)}
											id={textSplit}
											type={i?.type}
											placeholder='Required'
											min={i?.min}
											max={i?.max}
										/>
									</div>
								);
							})}
						</div>

						<DialogFooter className='flex justify-end flex-col'>
							<DialogClose asChild className='my-3'>
								<Button type='submit'>Post Log</Button>
							</DialogClose>
							<DialogClose asChild className='my-3'>
								<Button type='button' variant={'outline'}>
									Cancel
								</Button>
							</DialogClose>
						</DialogFooter>
					</div>
				</form>
			</ScrollArea>
		</>
	);
}
export default PostSubmit;
