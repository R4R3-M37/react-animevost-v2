import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AnimeCart from './components/AnimeCart'

import { IAnimeData } from '../../types/types'
import ContainerList from './components/ContainerList'
import { useGetAnimeSearchParamsMutation } from '../../redux/query/useGetAnimeData'


const AnimeListByGenre: React.FC = () => {
	const { genre } = useParams<{ genre: string }>()
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeSearchParamsMutation()
	
	useEffect(() => {
		doFetchAnimeData(`gen=${genre}`)
	}, [])
	
	return (
		<ContainerList>
			{animeArray && animeArray.map((anime: IAnimeData) => <AnimeCart anime={anime} key={anime.id} />)}
		</ContainerList>
	)
}

export default AnimeListByGenre
