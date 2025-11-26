import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function PostFilter({}) {
	return (
		<Card>
			<CardContent>
				<form className='grid gap-4'>
					<p className='font-bold'>Filter Feed</p>
					<Input type='search' />
					<Input type='date' />
					<Button asChild variant={'ghost'}>
						<Input type='submit' />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
