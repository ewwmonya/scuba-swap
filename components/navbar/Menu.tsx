import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export type LinkType = {
	link: string;
	text: string;
	id?: string;
};

function Menu({
	children,
	links,
}: {
	children: React.ReactNode;
	links: LinkType[];
}) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent className='max-w-lg'>
					{links
						? links.map((l) => {
								return (
									<div key={`linkTo${l.link}`} className='max-w-32'>
										<DropdownMenuLabel>
											<Link href={l.link}> {l.text}</Link>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
									</div>
								);
						  })
						: ''}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
export default Menu;
