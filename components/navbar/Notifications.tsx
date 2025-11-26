import { MdNotifications } from 'react-icons/md';
import { Button } from '../ui/button';

function Notifications() {
	return (
		<>
			<Button size={'icon-lg'} variant={'outline'} className='rounded-full'>
				<MdNotifications />
			</Button>
		</>
	);
}
export default Notifications;
