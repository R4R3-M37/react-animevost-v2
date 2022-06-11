import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import {
	AnimeList,
	AnimeListByGenre,
	AnimeListByType,
	AnimeListByYear,
	AnimePage,
	AnimeSchedule,
	AnimeSearch,
	FavoriteAnime,
} from './pages'

import { SearchContext } from './context/SearchContext'
import { allAnimeGenres, allAnimeTypes, allAnimeYears } from './config'

const App: React.FC = () => {
	const navigate = useNavigate()

	const [searchValue, setSearchValue] = useState<string>('')
	const [enterKeyPressed, setEnterKeyPressed] = useState<boolean>(false)
	const [searchActive, setSearchActive] = useState<boolean>(false)

	const [activeAnimeType, setActiveAnimeType] = useState<string>(allAnimeTypes[0])
	const [activeAnimeGenre, setActiveAnimeGenre] = useState<string>(allAnimeGenres[0])
	const [activeAnimeYear, setActiveAnimeYear] = useState<number>(allAnimeYears[0])

	useEffect(() => {
		if (searchValue) {
			navigate('/')
		}
	}, [enterKeyPressed])

	return (
		<SearchContext.Provider
			value={{
				searchValue,
				setSearchValue,
				enterKeyPressed,
				setEnterKeyPressed,
				searchActive,
				setSearchActive,
				activeAnimeType,
				setActiveAnimeType,
				activeAnimeGenre,
				setActiveAnimeGenre,
				activeAnimeYear,
				setActiveAnimeYear,
			}}>
			<Navbar />
			<Routes>
				<Route path='/' element={<AnimeList />} />
				<Route path='*' element={<AnimeList />} />
				<Route path='/anime/:animeId' element={<AnimePage />} />
				<Route path='/anime/favorite' element={<FavoriteAnime />} />
				<Route path='/anime/schedule' element={<AnimeSchedule />} />
				<Route path='/anime/search' element={<AnimeSearch />} />
				<Route path='/anime/genre/:genre' element={<AnimeListByGenre />} />
				<Route path='/anime/year/:year' element={<AnimeListByYear />} />
				<Route path='/anime/type/:type' element={<AnimeListByType />} />
			</Routes>
		</SearchContext.Provider>
	)
}

export default App
