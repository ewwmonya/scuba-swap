'use client';

import { supabaseBrowserClient } from '@/lib/supabaseClient';
import { useState } from 'react';
import { MdOutlineScubaDiving } from 'react-icons/md';

export default function SignUpPage() {
	const supabase = supabaseBrowserClient();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSignUp(e: React.FormEvent) {
		e.preventDefault();

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			alert(error.message);
		} else {
			alert('Check your email to confirm your account.');
		}
	}

	return (
		<form
			onSubmit={handleSignUp}
			autoComplete='off'
			className='w-full m-auto mt-24 max-w-[600px] p-10 bg-white rounded-lg shadow'
			aria-label='signup-form'
		>
			<div className='flex gap-2 justify-center text-orange-950 duration-500'>
				<h2 className='mb-10 text-3xl font-bold text-center flex'>Sign Up</h2>
				<MdOutlineScubaDiving className='text-3xl  ' width={20} height={20} />
			</div>
			<div className='flex flex-col items-start mb-5 gap-y-3'>
				<label htmlFor='email' className='text-sm font-medium cursor-pointer'>
					Email
				</label>
				<input
					id='email'
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					className='w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none'
					placeholder='Enter your email address...'
				/>
			</div>
			<div className='flex flex-col items-start mb-5 gap-y-3'>
				<label
					htmlFor='password'
					className='text-sm font-medium cursor-pointer'
				>
					Password
				</label>
				<input
					id='password'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					className='w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none'
					placeholder='Enter your password'
				/>
			</div>
			<div className='flex gap-2 items-center justify-end mb-5 text-slate-400'>
				<p>Already have an account?</p>
				<a href='#' className='text-orange-500 underline'>
					Sign In
				</a>
			</div>
			<button
				type='submit'
				className='inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-orange-500 rounded-lg h-[60px]'
			>
				Create an account
			</button>
		</form>
	);
}
