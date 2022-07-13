import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AnimeCart from './components/AnimeCart'

import { IAnimeData } from '../../types/types'
import { useGetAnimeSearchParamsMutation } from '../../redux/query/useGetAnimeData'
import ContainerList from './components/ContainerList'


const AnimeByYear: React.FC = () => {
	const { year } = useParams<{ year: string }>()
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeSearchParamsMutation()
	
	useEffect(() => {
		doFetchAnimeData(`year=${year}`)
	}, [])
	
	return (
		<ContainerList>
			{animeArray && animeArray.map((anime: IAnimeData) => <AnimeCart anime={anime}
			                                                                key={anime.id} />)}
		</ContainerList>
	)
}

export default AnimeByYear
