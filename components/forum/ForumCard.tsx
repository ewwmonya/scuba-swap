import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from '@/components/ui/item';
import { MdRemoveRedEye } from 'react-icons/md';
import { MdOutlineMessage } from 'react-icons/md';

function ForumCard({
	data,
}: {
	//! Temp remove this later!!
	data: {
		id: string;
		user: {
			name: string;
			avatar: string;
		};
		image: string;
		caption: string;
		likes: number;
		comments: {
			id: string;
			user: string;
			text: string;
		}[];
	};
}) {
	return (
		<div className='flex w-full flex-col gap-6 my-4'>
			<Item variant='outline'>
				<ItemContent>
					<ItemTitle>{data.caption}</ItemTitle>
					<ItemDescription>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
						provident numquam cum voluptas voluptatem natus inventore,
						accusantium eligendi accusamus maiores eius illum impedit quae omnis
						quam eum id architecto nihil. Inventore hic nobis voluptatum non at
						temporibus autem necessitatibus, quo exercitationem voluptas, itaque
						ullam laboriosam dolore voluptatibus quasi sapiente sunt nihil
						aspernatur corporis, veniam aliquid numquam nulla! Velit,
						voluptatibus ab. Aperiam consequuntur quas neque quo alias aliquid
						laboriosam non, adipisci vitae eligendi, ipsum provident obcaecati
						facere perferendis. Commodi dignissimos exercitationem minus aperiam
						atque quisquam autem quidem suscipit, esse repellendus eaque. Quae
						veniam veritatis optio praesentium. Architecto vel suscipit
						accusantium eveniet assumenda at neque odit, reprehenderit modi nisi
						nemo autem, eligendi veritatis sapiente esse voluptatibus dolorum
						laudantium omnis itaque. Magnam, id?
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<div className='flex gap-4 justify-between'>
						<p className='  text-md text-slate-800'>
							<MdRemoveRedEye />
							<span>3k</span>
						</p>
						<p className='  text-md text-slate-800'>
							<MdOutlineMessage />
							<span>30</span>
						</p>
					</div>
				</ItemActions>
			</Item>
		</div>
	);
}
export default ForumCard;
