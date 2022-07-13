import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { animeApi } from '../query/useGetAnimeData'
import favoriteAnimeReducer from '../slices/favoriteAnimeSlice'
import searchReducer from '../slices/searchSlice'


export const store = configureStore({
	reducer: {
		[animeApi.reducerPath]: animeApi.reducer,
		favoriteID: favoriteAnimeReducer,
		search: searchReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(animeApi.middleware),
})

setupListeners(store.dispatch)