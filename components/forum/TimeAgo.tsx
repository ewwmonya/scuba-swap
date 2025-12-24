import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

async function TimeAgo({ data }: { data: Date }) {
	const time = dayjs(data).fromNow();
	const timenow = dayjs(data);

	console.log(timenow);
	return (
		<>
			<p className='text-sm text-slate-500 dark:text-slate-400'>{time}</p>
			{/* <p className='text-sm text-slate-500 dark:text-slate-400'>{timenow}</p> */}
		</>
	);
}
export default TimeAgo;
