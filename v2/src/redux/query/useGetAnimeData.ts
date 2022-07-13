import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const animeApi = createApi({
	reducerPath: 'animeDataApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.animetop.info/v1/' }),
	endpoints: (builder) => ({
		getAnime: builder.mutation<any, string | undefined>({
			query: (id) => ({
				url: `info`,
				method: 'POST',
				headers: {
					'content-encoding': 'br',
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: `id=${id}`,
			}),
			transformResponse: (response: { data: any }) => response.data
		}),
		getAnimePlaylist: builder.mutation<any, string | undefined>({
			query: (id) => ({
				url: `playlist`,
				method: 'POST',
				headers: {
					'content-encoding': 'br',
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: `id=${id}`,
			}),
		}),
		getAnimeSearch: builder.mutation<any, string>({
			query: (searchValue) => ({
				url: 'search',
				method: 'POST',
				headers: {
					'content-encoding': 'br',
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: `name=${searchValue}`,
			}),
			transformResponse: (response: { data: any }) => response.data
		}),
		getAnimeSearchParams: builder.mutation<any, string>({
			query: (params) => ({
				url: 'search',
				method: 'POST',
				headers: {
					'content-encoding': 'br',
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: params,
			}),
			transformResponse: (response: { data: any }) => response.data
		}),
		getAnimeSchedule: builder.query<any, string>({
			query: (name) => `${name}`,
		}),
	}),
})

export const { useGetAnimeMutation, useGetAnimePlaylistMutation, useGetAnimeSearchMutation, useGetAnimeSearchParamsMutation, useGetAnimeScheduleQuery } = animeApi