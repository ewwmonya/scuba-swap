'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
	Settings,
	Camera,
	BadgeCheck,
	AtSign,
	CheckCircle2,
	AlertTriangle,
	Trash2,
	UserRound,
	Link2,
} from 'lucide-react';
import Image from 'next/image';

type AccountUser = {
	username: string;
	email: string;
	avatar?: {
		url: string;
	} | null;
};

type AccountSettingsProps = {
	user: AccountUser;
};

export default function AccountSettings({ user }: AccountSettingsProps) {
	const router = useRouter();

	const [username, setUsername] = useState(user.username);
	const [avatar, setAvatar] = useState(user.avatar?.url ?? '');
	const [showAvatarInput, setShowAvatarInput] = useState(false);

	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [savedProfile, setSavedProfile] = useState({
		username: user.username,
		avatar: user.avatar?.url ?? '',
	});

	function handleCancel() {
		setUsername(savedProfile.username);
		setAvatar(savedProfile.avatar);
		setError('');
		setSuccess('');
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setIsSaving(true);
		setError('');
		setSuccess('');

		try {
			const response = await fetch('/api/profile/update-account', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					...(avatar.trim() ? { avatar: avatar.trim() } : {}),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error ?? 'Failed to update profile');
			}

			const updated = {
				username: data.user.username,
				avatar: data.user.avatar?.url ?? '',
			};

			setSavedProfile(updated);
			setUsername(updated.username);
			setAvatar(updated.avatar);
			setSuccess('Account updated successfully.');

			router.refresh();
		} catch (err) {
			console.log(err);
			setError(err instanceof Error ? err.message : 'Something went wrong.');
		} finally {
			setIsSaving(false);
		}
	}

	const avatarPreview = avatar.trim();

	return (
		<main className='mx-auto flex w-full max-w-3xl flex-col gap-8 py-8'>
			{/* HEADER */}
			<header className='flex flex-col gap-2'>
				<div className='flex items-center gap-2 text-cyan-700'>
					<Settings size={18} />
					<span className='text-xs font-semibold uppercase tracking-widest'>
						User Preferences
					</span>
				</div>

				<h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
					Account Settings
				</h1>

				<p className='text-sm text-slate-500 sm:text-base'>
					Manage your personal profile and account information.
				</p>
			</header>

			{/* MAIN PROFILE CARD */}
			<section className='flex flex-col gap-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
				{/* AVATAR MANAGEMENT */}
				<div className='flex flex-col items-start gap-6 border-b border-slate-100 pb-6 sm:flex-row sm:items-center'>
					<div className='group relative shrink-0'>
						<div className='flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100 shadow-inner'>
							{avatarPreview ?
								<Image
									width={30}
									height={30}
									src={avatarPreview}
									alt={`${username}'s avatar`}
									className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
									onError={(event) => {
										event.currentTarget.style.display = 'none';
									}}
								/>
							:	<UserRound size={38} className='text-slate-400' />}
						</div>

						<button
							type='button'
							aria-label='Change avatar URL'
							onClick={() => setShowAvatarInput(!showAvatarInput)}
							className='absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-sky-900 p-2 text-white shadow-md transition-colors hover:bg-cyan-700'
						>
							<Camera size={17} />
						</button>
					</div>

					<div className='flex flex-1 flex-col gap-3'>
						<div className='flex flex-wrap items-center gap-3'>
							<button
								type='button'
								onClick={() => setShowAvatarInput(!showAvatarInput)}
								className='rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200'
							>
								Change Avatar URL
							</button>

							<button
								type='button'
								onClick={() => {
									setAvatar('');
									setShowAvatarInput(false);
								}}
								className='rounded-lg px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50'
							>
								Clear Preview
							</button>
						</div>

						<p className='text-xs leading-relaxed text-slate-500'>
							For now, use an HTTPS image URL. Image uploads will be added
							later.
						</p>

						{showAvatarInput && (
							<div className='relative'>
								<Link2
									size={18}
									className='pointer-events-none absolute left-3 top-3 text-slate-400'
								/>
								<input
									type='url'
									value={avatar}
									onChange={(e) => setAvatar(e.target.value)}
									placeholder='https://example.com/avatar.jpg'
									className='w-full rounded-lg bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-cyan-500/30'
								/>
							</div>
						)}
					</div>
				</div>

				{/* PROFILE FORM */}
				<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
					{/* USERNAME */}
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='username'
							className='flex items-center gap-1 text-sm font-semibold text-slate-800'
						>
							Username
							<span className='text-cyan-700'>*</span>
						</label>

						<div className='relative flex items-center'>
							<UserRound
								size={20}
								className='pointer-events-none absolute left-3.5 text-slate-400'
							/>

							<input
								id='username'
								type='text'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								minLength={4}
								maxLength={30}
								required
								placeholder='Enter your username'
								className='w-full rounded-lg bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-cyan-500/30'
							/>
						</div>

						<span className='text-xs text-slate-500'>
							This is the name other divers will see on your posts and profile.
						</span>
					</div>

					{/* EMAIL */}
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between gap-3'>
							<label
								htmlFor='emailAddress'
								className='text-sm font-semibold text-slate-800'
							>
								Email Address
							</label>

							<span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600'>
								<BadgeCheck size={14} />
								Managed by Supabase
							</span>
						</div>

						<div className='relative flex items-center'>
							<AtSign
								size={20}
								className='pointer-events-none absolute left-3.5 text-slate-400'
							/>

							<input
								id='emailAddress'
								type='email'
								value={user.email}
								readOnly
								className='w-full cursor-not-allowed rounded-lg bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none'
							/>
						</div>

						<span className='text-xs text-slate-500'>
							Email changes will be available through account verification
							later.
						</span>
					</div>

					{/* FEEDBACK */}
					{error && (
						<p
							role='alert'
							className='rounded-lg bg-red-50 p-3 text-sm text-red-700'
						>
							{error}
						</p>
					)}

					{success && (
						<p
							role='status'
							className='rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700'
						>
							{success}
						</p>
					)}

					{/* BUTTONS */}
					<div className='flex items-center justify-end gap-3 border-t border-slate-100 pt-6'>
						<button
							type='button'
							onClick={handleCancel}
							disabled={isSaving}
							className='rounded-lg px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50'
						>
							Cancel
						</button>

						<button
							type='submit'
							disabled={isSaving}
							className='flex items-center gap-2 rounded-lg bg-sky-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60'
						>
							<CheckCircle2 size={18} />
							{isSaving ? 'Saving...' : 'Save Changes'}
						</button>
					</div>
				</form>
			</section>

			{/* DANGER ZONE */}
			<section className='flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
				<div className='flex items-center gap-2 text-red-600'>
					<AlertTriangle size={20} />
					<h2 className='text-lg font-semibold'>Delete Account</h2>
				</div>

				<div className='flex flex-col justify-between gap-5 md:flex-row md:items-center'>
					<div className='flex max-w-xl flex-col gap-2'>
						<p className='text-sm text-slate-800'>
							Permanently remove your account, dive logs, and community history.
						</p>

						<p className='text-xs font-medium leading-relaxed text-slate-500'>
							This action cannot be undone. Account deletion will be available
							once the secure deletion workflow is implemented.
						</p>
					</div>

					<button
						type='button'
						disabled
						title='Account deletion is not available yet'
						className='flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-400 opacity-60'
					>
						<Trash2 size={18} />
						Delete Account
					</button>
				</div>
			</section>
		</main>
	);
}
