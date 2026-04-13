import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import PostSubmit from './PostSubmit';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

function PostDrawer() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant='outline'>Make Dive Log</Button>
				</DialogTrigger>
				<DialogContent
					className=' lg:max-w-6xl mx-auto py-4'
					showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle>Post Dive Log</DialogTitle>
						<DialogDescription>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.ssss
						</DialogDescription>
					</DialogHeader>
					<PostSubmit />
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default PostDrawer;
