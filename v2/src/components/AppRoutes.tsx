import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {
	AnimeList,
	AnimeListByGenre, AnimeListByType,
	AnimeListByYear,
	AnimePage,
	AnimeSchedule,
	AnimeSearch,
	FavoriteAnime,
} from '../pages'


const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<AnimeList />} />
			<Route path='*' element={<AnimeList />} />
			<Route path='/anime/:animeID' element={<AnimePage />} />
			<Route path='/anime/favorite' element={<FavoriteAnime />} />
			<Route path='/anime/schedule' element={<AnimeSchedule />} />
			<Route path='/anime/search' element={<AnimeSearch />} />
			<Route path='/anime/genre/:genre' element={<AnimeListByGenre />} />
			<Route path='/anime/year/:year' element={<AnimeListByYear />} />
			<Route path='/anime/type/:type' element={<AnimeListByType />} />
		</Routes>
	)
}

export default AppRoutes