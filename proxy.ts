import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

export async function proxy(request: NextRequest) {
	if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname !== '/') {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return await updateSession(request);
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
