import {
	DropdownMenu,
	DropdownMenuContent,
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
				<DropdownMenuContent className='max-w-lg '>
					{links ? (
						links.map((l) => {
							return (
								<div
									key={`linkTo${l.link}`}
									className='max-w-32 m-2 shadow-2xl'
								>
									<DropdownMenuLabel className=' hover:bg-blue-50  rounded-tr-sm '>
										<Link href={l.link} className='capitalize tracking-wide '>
											{l.text}
										</Link>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
								</div>
							);
						})
					) : (
						<></>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
export default Menu;
