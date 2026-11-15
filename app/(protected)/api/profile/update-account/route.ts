import { prisma } from '@/lib/prismaActions';
import { getCurrentUserProfile } from '@/lib/supabase/getCurrentUserProfile';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const updateProfileSchema = z.object({
	username: z.string().trim().min(4).max(30),
	avatar: z
		.url()
		.refine((url) => {
			const parsed = new URL(url);
			return (
				parsed.protocol === 'https:' ||
				(process.env.NODE_ENV === 'development' && parsed.protocol === 'http:')
			);
		}, 'Avatar must use HTTPS')
		.optional(),
});

export async function PATCH(req: Request) {
	// 1. Get authenticated user
	const user = await getCurrentUserProfile();

	if (!user) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	// 2. Parse JSON
	let body: unknown;

	try {
		body = await req.json();
	} catch {
		return Response.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	// 3. Validate submitted information
	const parsed = updateProfileSchema.safeParse(body);

	if (!parsed.success) {
		return Response.json(
			{
				error: 'Invalid Account Information',
				details: z.flattenError(parsed.error),
			},
			{ status: 400 },
		);
	}

	// 4. Update the profile
	try {
		const { username, avatar } = parsed.data;

		const updatedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				username,

				...(avatar !== undefined && {
					avatar: {
						upsert: {
							create: {
								url: avatar,
							},
							update: {
								url: avatar,
							},
						},
					},
				}),
			},
			select: {
				id: true,
				username: true,
				email: true,
				avatar: {
					select: {
						url: true,
					},
				},
			},
		});

		return Response.json(
			{
				message: 'Profile updated successfully',
				user: updatedUser,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Profile update error:', error);

		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			return Response.json(
				{ error: 'Username or avatar URL already exists' },
				{ status: 409 },
			);
		}

		return Response.json(
			{ error: 'Failed to update profile' },
			{ status: 500 },
		);
	}
}
