import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IAnimeData, ISelectorState } from '../../types/types'

import useScrollPagination from '../../hooks/useScrollPagination'
import AnimeCart from './components/AnimeCart'
import { useGetAnimeSearchMutation } from '../../redux/query/useGetAnimeData'
import ContainerList from './components/ContainerList'


const AnimeList: React.FC = () => {
	const [page, setPage] = useState<number>(1)
	const { search } = useSelector((state: ISelectorState) => state)
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeSearchMutation()
	
	const apiUrl: string = `last?page=${page}&quantity=10`
	const response: IAnimeData[] = useScrollPagination(page, setPage, apiUrl)
	
	useEffect(() => {
		if (search.searchInput !== '') {
			doFetchAnimeData(search.searchInput)
		}
	}, [search.activeSearch])
	
	if (search.searchInput === '') {
		return (
			<ContainerList>
				{response && response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
			</ContainerList>
		)
	}
	
	return (
		<ContainerList>
			{animeArray
				? animeArray.map((anime: IAnimeData) => <AnimeCart anime={anime} key={anime.id} />)
				: response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
		</ContainerList>
	)
}

export default AnimeList
