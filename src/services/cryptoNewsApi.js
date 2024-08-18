import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cryptoNewsCache from './cryptoNewsCache.json';

const cryptoNewsHeaders = {
  accept: 'application/json',
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2' });

    try {
      const response = await baseQuery(args, api, extraOptions);

      // If the API request is successful, return the response
      if (response.data) {
        return response;
      }
      throw new Error('No data returned from API');
    } catch (error) {
      // Fallback to the local JSON file if API request fails
      console.error('API request failed, using cached data:', error);
      return { data: cryptoNewsCache };
    }
  },
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => {
        const date = getYesterdayDate();
        return createRequest(`/everything?q=${newsCategory}&from=${date}&sortBy=popularity&pageSize=${count}&apiKey=674525a1f2f74c86a32a18281991c21f`);
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
