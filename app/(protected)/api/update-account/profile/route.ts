import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { z } from 'zod';

export async function PATCH(req: Request) {
	const { email, username, authId } = await req.json();

	const data = await prisma.user.findUnique({ where: { email } });
}
