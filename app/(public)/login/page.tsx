'use client';

import { supabaseBrowserClient } from '@/lib/supabaseClient';
import { useState } from 'react';
import { MdOutlineScubaDiving } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const supabase = supabaseBrowserClient();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();

		console.log('Attempting login with:', email);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error('LOGIN ERROR:', error);
			alert(error.message);
			return;
		}

		console.log('LOGIN SUCCESS:', data);

		localStorage.setItem(
			'sb-vbfnfpmvijwoxuabvyyr-auth-token',
			JSON.stringify(data)
		);
		router.push('/forum');
	}

	return (
		<form
			onSubmit={handleLogin}
			autoComplete='off'
			className='w-full m-auto mt-24 max-w-[600px] p-10 bg-white rounded-lg shadow'
			aria-label='login-form'
		>
			<div className='flex gap-2 justify-center text-slate-950 duration-500'>
				<h2 className='mb-10 text-3xl font-bold text-center flex'>Login</h2>
				<MdOutlineScubaDiving className='text-3xl' width={20} height={20} />
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
				<p>Don&apos;t have an account?</p>
				<a href='/signup' className='text-slate-500 underline'>
					Signup
				</a>
			</div>

			<button
				type='submit'
				className='inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-slate-500 rounded-lg h-[60px]'
			>
				Login
			</button>
		</form>
	);
}
