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
	FavoriteAnime,
} from './pages'
import { SearchContext } from './context/SearchContext'

const App: React.FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [enterKeyPressed, setEnterKeyPressed] = useState<boolean>(false)

	const navigate = useNavigate()

	useEffect(() => {
		if (searchValue) {
			navigate('/')
		}
	}, [enterKeyPressed])

	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue, enterKeyPressed, setEnterKeyPressed }}>
			<Navbar />
			<Routes>
				<Route path='/' element={<AnimeList />} />
				<Route path='*' element={<AnimeList />} />
				<Route path='/anime/:animeId' element={<AnimePage />} />
				<Route path='/anime/favorite' element={<FavoriteAnime />} />
				<Route path='/anime/schedule' element={<AnimeSchedule />} />
				<Route path='/anime/genre/:genre' element={<AnimeListByGenre />} />
				<Route path='/anime/year/:year' element={<AnimeListByYear />} />
				<Route path='/anime/type/:type' element={<AnimeListByType />} />
			</Routes>
		</SearchContext.Provider>
	)
}

export default App
