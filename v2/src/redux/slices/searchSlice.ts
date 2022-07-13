import { createSlice } from '@reduxjs/toolkit'
import { allAnimeGenres, allAnimeTypes, allAnimeYears } from '../../config'


export interface InitialState {
	activeSearch: boolean
	searchInput: string
	type: string
	genre: string
	year: number
}

const initialState: InitialState = {
	activeSearch: false,
	searchInput: '',
	type: allAnimeTypes[0],
	genre: allAnimeGenres[0],
	year: allAnimeYears[0],
}

export const searchSlice = createSlice({
	name: 'searchAnime',
	initialState,
	reducers: {
		setType: (state, { payload }) => {
			state.type = payload
		},
		setGenre: (state, { payload }) => {
			state.genre = payload
		},
		setYear: (state, { payload }) => {
			state.year = payload
		},
		setSearchActive: (state) => {
			state.activeSearch = !state.activeSearch
		},
		setSearchInput: (state, { payload }) => {
			state.searchInput = payload
		},
	},
})

export const { setType, setGenre, setYear, setSearchInput, setSearchActive } = searchSlice.actions

export default searchSlice.reducer