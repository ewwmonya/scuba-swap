'use client';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const SignOutButton = () => {
	const supabase = supabaseBrowserClient();
	const router = useRouter();

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
		} else {
			// Optional: Redirect the user after successful sign out
			router.refresh();
			router.push('/');
		}
	};

	return false ? (
		<button onClick={handleSignOut}>Sign Out</button>
	) : (
		<>
			<Button variant={'secondary'} asChild>
				<Link href={'/signup'}>Signup Now!</Link>
			</Button>
			<Button asChild>
				<Link href={'/login'}>Login</Link>
			</Button>
		</>
	);
};

export default SignOutButton;
