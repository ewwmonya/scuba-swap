import { createServerClient, type EmailOtpType } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const tokenHash = requestUrl.searchParams.get('token_hash');
	const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
	const requestedNext = requestUrl.searchParams.get('next');
	const next = requestedNext?.startsWith('/') ? requestedNext : '/update-password';

	if (!tokenHash || !type) {
		return NextResponse.redirect(new URL('/login?error=invalid-reset-link', requestUrl.origin));
	}

	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options),
					);
				},
			},
		},
	);

	const { error } = await supabase.auth.verifyOtp({
		type,
		token_hash: tokenHash,
	});

	if (error) {
		return NextResponse.redirect(new URL('/login?error=expired-reset-link', requestUrl.origin));
	}

	return NextResponse.redirect(new URL(next, requestUrl.origin));
}
