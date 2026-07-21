'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
	const supabase = supabaseBrowserClient();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		const redirectTo = `${window.location.origin}/auth/confirm?next=/update-password`;
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		});

		setLoading(false);

		if (error) {
			setMessage(error.message);
			return;
		}

		setMessage('Check your email for a password reset link.');
	}

	return (
		<div className='min-h-screen px-4 py-24'>
			<form
				onSubmit={handleReset}
				className='w-full max-w-[600px] p-10 mx-auto bg-white rounded-lg shadow'
			>
				<h1 className='mb-3 text-3xl font-bold text-slate-950'>Reset password</h1>
				<p className='mb-8 text-slate-500'>
					Enter the email address connected to your Scuba Swap account.
				</p>

				<label htmlFor='email' className='block mb-3 text-sm font-medium'>
					Email
				</label>
				<input
					id='email'
					type='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder='Enter your email address...'
					className='w-full p-4 mb-5 bg-transparent border border-gray-200 rounded-lg outline-none'
					required
				/>

				{message && <p className='mb-5 text-sm text-slate-600'>{message}</p>}

				<button
					type='submit'
					disabled={loading}
					className='inline-flex w-full items-center justify-center px-8 py-4 font-semibold tracking-wide text-white bg-slate-500 rounded-lg h-[60px] disabled:opacity-60'
				>
					{loading ? 'Sending...' : 'Send reset link'}
				</button>

				<div className='mt-6 text-center'>
					<Link href='/login' className='text-sm text-slate-500 underline'>
						Back to login
					</Link>
				</div>
			</form>
		</div>
	);
}
