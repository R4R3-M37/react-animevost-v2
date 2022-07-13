import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AnimeCart from '../AnimeList/components/AnimeCart'
import { animeTypes } from '../../config'

import { IAnimeData, ISelectorState } from '../../types/types'
import { useGetAnimeSearchParamsMutation } from '../../redux/query/useGetAnimeData'
import ContainerList from '../AnimeList/components/ContainerList'


const AnimeSearch = () => {
	const { search } = useSelector((state: ISelectorState) => state)
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeSearchParamsMutation()
	
	useEffect(() => {
		const typeData = !!search.type && `cat=${animeTypes[search.type.toLowerCase() as keyof typeof animeTypes]}`
		const yearData = !!search.year && `&year=${search.year}`
		const genreData = !!search.genre && `&gen=${search.genre}`
		doFetchAnimeData(`${typeData && typeData}${yearData && yearData}${genreData && genreData}`)
	}, [search.activeSearch])
	
	return (
		<ContainerList>
			{animeArray && animeArray.map((anime: IAnimeData) => <AnimeCart anime={anime} key={anime.id} />)}
		</ContainerList>
	)
}

export default AnimeSearch
