import { createSlice } from '@reduxjs/toolkit'


export interface InitialState {
	favoriteID: any
}

// @ts-ignore
const initialLocalStorage = localStorage.getItem('favoriteAnimeId') !== null ? localStorage.getItem('favoriteAnimeId').split(', ') : []

const initialState: InitialState = {
	favoriteID: initialLocalStorage,
}

export const favoriteAnimeSlice = createSlice({
	name: 'favoriteAnime',
	initialState,
	reducers: {
		addToFavorite: (state, { payload }) => {
			state.favoriteID.push(payload)
			localStorage.setItem('favoriteAnimeId', state.favoriteID.join(', '))
		},
		removeFromFavorite: (state, { payload }) => {
			const filtered = state.favoriteID.filter((id: string) => id !== payload)
			state.favoriteID = filtered
			localStorage.setItem('favoriteAnimeId', state.favoriteID.join(', '))
		},
	},
})

export const { addToFavorite, removeFromFavorite } = favoriteAnimeSlice.actions

export default favoriteAnimeSlice.reducer