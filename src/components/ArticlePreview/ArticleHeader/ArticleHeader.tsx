import { getLongestSubstring } from '@/utils/getLongestSubstring';
import { formatDate } from '@/libs/date-fns/formatDate';

interface Props {
  title: string;
  date: string;
  source: string;
  author?: string;
}

const ArticleHeader = ({ title, date, source, author }: Props) => (
  <header className="h-full flex flex-col justify-between">
    <h1 className="text-xl uppercase font-bold w-fit">{getLongestSubstring(title)}</h1>
    <div className="flex justify-between flex-row text-sm border-t-2 mt-1 pt-1">
      <span>
        {formatDate(date)} {!!author && ` - ${author}`}
      </span>
      <span>
        <i className="text-xs"> from: </i>
        {source}
      </span>
    </div>
  </header>
);
export default ArticleHeader;
