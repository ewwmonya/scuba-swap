import type { Prisma } from '@prisma/client';

export function diveCardInclude(viewerId?: string) {
	return {
		user: {
			select: { username: true, avatar: { select: { url: true } } },
		},
		_count: { select: { likes: true, comments: true } },
		likes: {
			where: { userId: viewerId ?? '' },
			select: { id: true },
			take: 1,
		},
	} satisfies Prisma.DivesInclude;
}

export type DiveCardData = Prisma.DivesGetPayload<{
	include: ReturnType<typeof diveCardInclude>;
}>;
