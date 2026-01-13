'use client';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

import { useRouter } from 'next/navigation';

const SignInSignUpSignOut = () => {
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

	return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignInSignUpSignOut;
