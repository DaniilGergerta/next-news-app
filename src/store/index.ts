import { TCountryCode } from '@/common/types';
import { IArticle } from '@/components/ArticlePreview/types';
import { instance } from '@/libs/axios';
import { action, Action, createStore, createTypedHooks, thunk, Thunk } from 'easy-peasy';

type SetNews = {
  news: IArticle[],
  country?: TCountryCode,
  filtered?: boolean,
}

type GetNews = {
  country?: TCountryCode,
  query?: string,
  page?: number;
  filterBy?: string;
}

interface ResponseData {
  totalResults: number,
  status: string,
  articles: IArticle[]
}

export interface StoreModel {
  news: IArticle[];
  totalPages: number;
  country: TCountryCode;
  query: string;
  filterBy: string;
  setFilterBy: Action<StoreModel, string>;
  setTotalPages: Action<StoreModel, number>;
  setQuery: Action<StoreModel, string>;
  setCountry: Action<StoreModel, string>;
  setNews: Action<StoreModel, SetNews>;
  getNews: Thunk<StoreModel, GetNews>;
}

export const store = createStore<StoreModel>({
  news: [],
  totalPages: 0,
  country: 'US',
  query: '',
  filterBy: '',
  setQuery: action((state, payload) => {
    state.query = payload;
  }),
  setFilterBy: action((state, payload) => {
    state.filterBy = payload === 'All' ? '' : payload.toLocaleLowerCase();
  }),
  setCountry: action((state, payload) => {
    state.news = [];
    state.country = payload;
    console.log('Country', state.country);
  }),
  setNews: action((state, payload) => {
    if (!payload.filtered && payload.country && state.country.toLocaleLowerCase() === payload.country) {
      state.news = [...state.news, ...payload.news];
      console.log('Bla bla');
    } else {
      state.news = payload.news
    }
  }),
  setTotalPages: action((state, payload) => {
    console.log('Total Pages', payload)
    state.totalPages = payload;
  }),
  getNews: thunk(async (actions, payload) => {
    try {
      console.log('getNews Country', payload.country);
      console.log('ENDPOINT', `/top-headlines?${payload.filterBy ? `country=${payload.country}` : `${payload.country ? `country=${payload.country}` : payload.query ? `q=${payload.query}` : ''}&pageSize=10${payload.page ? `&page=${payload.page}` : ''}`}`)

      const { data }: { data: ResponseData } = await instance.get(`/top-headlines?${payload.filterBy ? `country=${payload.country}` : `${payload.country ? `country=${payload.country}` : payload.query ? `q=${payload.query}` : ''}&pageSize=10${payload.page ? `&page=${payload.page}` : ''}`}`);

      console.log('Data totalResults', data.totalResults)

      actions.setTotalPages(data.totalResults);

      console.log('data', data);

      console.log('filterBy', payload.filterBy);

      if(payload.filterBy) {
        const filteredData = data.articles.filter((article: IArticle) => {
          // console.log(payload.filterBy === 'source name' ? article.source.name.toLocaleLowerCase().includes(payload.query ? payload.query.toLocaleLowerCase() : '') : article[payload.filterBy].toLocaleLowerCase().includes(payload.query ? payload.query.toLocaleLowerCase() : ''));
          return payload.filterBy === 'source name' ? article.source.name ? article.source.name.toLocaleLowerCase().includes(payload.query ? payload.query.toLocaleLowerCase() : '') : false : article[payload.filterBy] ? article[payload.filterBy].toLocaleLowerCase().includes(payload.query ? payload.query.toLocaleLowerCase() : '') : false;
        });
        payload.country ? actions.setNews({ news: filteredData, country: payload.country, filtered: true }) : actions.setNews({ news: filteredData, filtered: true });
      } else {
        payload.country ? actions.setNews({ news: data.articles, country: payload.country }) : actions.setNews({ news: data.articles });
      }
    } catch (e) {
      console.log(e);
    }
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

