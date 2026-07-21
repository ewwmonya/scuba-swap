'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

export default function UpdatePasswordPage() {
	const supabase = supabaseBrowserClient();
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [checkingSession, setCheckingSession] = useState(true);

	useEffect(() => {
		async function checkRecoverySession() {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				router.replace('/login?error=invalid-reset-session');
				return;
			}

			setCheckingSession(false);
		}

		checkRecoverySession();
	}, [router, supabase]);

	async function handleUpdatePassword(e: React.FormEvent) {
		e.preventDefault();
		setMessage('');

		if (password.length < 8) {
			setMessage('Password must be at least 8 characters.');
			return;
		}

		if (password !== confirmPassword) {
			setMessage('Passwords do not match.');
			return;
		}

		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password });
		setLoading(false);

		if (error) {
			setMessage(error.message);
			return;
		}

		await supabase.auth.signOut();
		router.replace('/login?message=password-updated');
		router.refresh();
	}

	if (checkingSession) {
		return <p className='py-24 text-center text-slate-500'>Checking reset link...</p>;
	}

	return (
		<div className='min-h-screen px-4 py-24'>
			<form
				onSubmit={handleUpdatePassword}
				className='w-full max-w-[600px] p-10 mx-auto bg-white rounded-lg shadow'
			>
				<h1 className='mb-3 text-3xl font-bold text-slate-950'>Choose a new password</h1>
				<p className='mb-8 text-slate-500'>
					Use at least 8 characters and avoid reusing an old password.
				</p>

				<label htmlFor='password' className='block mb-3 text-sm font-medium'>
					New password
				</label>
				<input
					id='password'
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					className='w-full p-4 mb-5 bg-transparent border border-gray-200 rounded-lg outline-none'
					required
					minLength={8}
				/>

				<label htmlFor='confirm-password' className='block mb-3 text-sm font-medium'>
					Confirm new password
				</label>
				<input
					id='confirm-password'
					type='password'
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					className='w-full p-4 mb-5 bg-transparent border border-gray-200 rounded-lg outline-none'
					required
					minLength={8}
				/>

				{message && <p className='mb-5 text-sm text-slate-600'>{message}</p>}

				<button
					type='submit'
					disabled={loading}
					className='inline-flex w-full items-center justify-center px-8 py-4 font-semibold tracking-wide text-white bg-slate-500 rounded-lg h-[60px] disabled:opacity-60'
				>
					{loading ? 'Updating...' : 'Update password'}
				</button>
			</form>
		</div>
	);
}
