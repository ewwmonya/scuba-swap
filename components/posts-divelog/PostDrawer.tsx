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

function PostDrawer() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant='outline'>Make Dive Log</Button>
				</DialogTrigger>
				<DialogContent
					className='sm:max-w-screen min-h-screen lg:max-w-6xl lg:min-h-[300px] mx-auto py-4'
					showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle>Post Dive Log</DialogTitle>
						<DialogDescription>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						</DialogDescription>
					</DialogHeader>
					<PostSubmit />
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default PostDrawer;
