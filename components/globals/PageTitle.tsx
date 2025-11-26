import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

type textColor = 'text-white' | 'text-slate-800';

function PageTitle({
	textColor,
	text,
}: {
	textColor: textColor;
	text: string;
}) {
	return (
		<>
			<h3
				className={cn(
					textColor,
					'text-4xl font-black leading-tight tracking-[-0.033em]'
				)}
			>
				{text}
			</h3>
		</>
	);
}
export default PageTitle;
