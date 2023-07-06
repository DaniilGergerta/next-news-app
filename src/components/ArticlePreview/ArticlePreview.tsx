import LinkOverlay from '@/components/UI/LinkOverlay';
import ArticleContainer from '@/components/ArticlePreview/ArticleContainer';
import { IArticle } from '@/components/ArticlePreview/types';
import ArticleHeader from '@/components/ArticlePreview/ArticleHeader';
import { stripDomain } from '@/utils/stripDomain';

export interface Props {
  article: IArticle;
}

const ArticlePreview = ({ article }: Props) => {
  return (
    <ArticleContainer imageUrl={article.urlToImage}>
      <section className="backdrop-blur-sm bg-black/60 p-4 h-fit">
        <ArticleHeader
          title={article.title}
          date={article.publishedAt}
          source={stripDomain(article.source.name)}
          author={article.author}
        />
        <p className="mt-4">{article.description}</p>
        <LinkOverlay url={article.url} label={`Read article at: ${stripDomain(article.source.name)}`} />
      </section>
    </ArticleContainer>
  );
};
export default ArticlePreview;
