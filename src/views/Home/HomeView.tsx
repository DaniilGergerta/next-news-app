'use client';
// noinspection JSUnusedGlobalSymbols

import ArticlePreview from '@/components/ArticlePreview';
import { useStoreActions, useStoreState } from '@/store';
import { debounceFunction } from '@/utils/debounce';
import { mockData } from '@/views/Home/mockData';
import { useCallback, useEffect, useRef, useState } from 'react';

export const revalidate = 60 * 60 * 24;

const HomeView = () => {
  const { news, country, query, totalPages, filterBy } = useStoreState((state) => state);
  const [page, setPage] = useState(2);
  const getNews = useStoreActions((actions) => actions.getNews);

  useEffect(() => {
    if (filterBy) {
      getNews({ country: country.toLocaleLowerCase(), query, filterBy });
      setPage(2);
    } else {
      query ? getNews({ query: query.toLocaleLowerCase() }) : getNews({ country: country.toLocaleLowerCase() });
      setPage(2);
    }
  }, [country, query]);

  const loadMoreNews = useCallback(
    (page: number, totalPages: number) => {
      if (Math.ceil(totalPages / 10) >= page) {
        query
          ? getNews({ query: query.toLocaleLowerCase(), page })
          : getNews({ country: country.toLocaleLowerCase(), page });

        setPage((prev) => prev + 1);
      }
    },
    [page, totalPages]
  );

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = debounceFunction(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (documentHeight - scrollPosition - windowHeight < 100) {
          loadMoreNews(page, totalPages);
        }
      }

      prevScrollY.current = currentScrollY;
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, totalPages]);

  return (
    <section className="grid gap-8">
      {news.map((article, i) => (
        <ArticlePreview key={i} article={article} />
      ))}
    </section>
  );
};

export default HomeView;
