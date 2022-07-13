import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AnimeCart from './components/AnimeCart'
import { animeTypes } from '../../config'

import { IAnimeData } from '../../types/types'
import { useGetAnimeSearchParamsMutation } from '../../redux/query/useGetAnimeData'
import ContainerList from './components/ContainerList'


const AnimeListByType: React.FC = () => {
	const { type } = useParams<{ type: string }>()
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeSearchParamsMutation()
	
	useEffect(() => {
		doFetchAnimeData(`cat=${animeTypes[type as keyof typeof animeTypes]}`)
	}, [])
	
	return (
		<ContainerList>
			{animeArray && animeArray.map((anime: IAnimeData) => <AnimeCart anime={anime} key={anime.id} />)}
		</ContainerList>
	)
}

export default AnimeListByType
