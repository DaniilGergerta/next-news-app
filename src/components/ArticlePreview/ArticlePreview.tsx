import { FC } from 'react';
import ArticlePreviewProps from '@/components/ArticlePreview/config/props';
import { getLongestSubstring } from '@/utils/getLongestSubstring';
import { formatDate } from '@/libs/date-fns/formatDate';
import LinkOverlay from '@/components/UI/LinkOverlay';

const ArticlePreview: FC<ArticlePreviewProps> = ({ article }) => {
  return (
    <div
      className="bg-gray-50 bg-cover rounded-xl overflow-hidden bg-top text-white relative"
      style={{
        backgroundImage: `url(${article.urlToImage})`,
      }}
    >
      <section className="backdrop-blur-sm bg-black/50 p-4 h-full flex flex-col justify-between">
        <h1 className="text-xl uppercase font-bold w-fit">{getLongestSubstring(article.title)}</h1>
        <div className="flex justify-between flex-row text-sm border-t-2 mt-1">
          <p>{formatDate(article.publishedAt)}</p>
          <p>
            <i>from: </i>
            {article.source.name}
          </p>
        </div>
        <LinkOverlay url={article.url} label={`Read article at: ${article.source.name}`} />
      </section>
    </div>
  );
};
export default ArticlePreview;
