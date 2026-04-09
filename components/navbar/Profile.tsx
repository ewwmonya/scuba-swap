import { Button } from '../ui/button';

function Profile({ src }: { src?: string }) {
	return <Button variant={'outline'}>{src}</Button>;
}
export default Profile;
