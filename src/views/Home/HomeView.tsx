import ArticlePreview from '@/components/ArticlePreview';
import { mockData } from '@/views/Home/mockData';

export const revalidate = 60 * 60 * 24;

const HomeView = () => {
  return (
    <section className="grid gap-8">
      {mockData.map((article, i) => (
        <ArticlePreview key={i} article={article} />
      ))}
    </section>
  );
};
export default HomeView;
