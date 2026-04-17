import { prisma } from '../prismaActions';

export const getUserName = async (userNameToFind: string) => {
	const data = await prisma.user.findUnique({
		where: {
			username: userNameToFind,
		},
	});
	// console.log(data);
	return data;
};
