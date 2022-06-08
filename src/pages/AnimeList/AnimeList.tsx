import React, { useContext, useEffect, useState } from 'react'

import useScrollPagination from '../../hooks/useScrollPagination'
import AnimeCart from './components/AnimeCart'
import useFetch from '../../hooks/useFetch'

import { SearchContext } from '../../context/SearchContext'
import { IAnimeResponseData } from '../../types/types'

const AnimeList: React.FC = () => {
	const [page, setPage] = useState<number>(1)
	const { searchValue, enterKeyPressed } = useContext(SearchContext)

	const apiUrl: string = `/v1/last?page=${page}&quantity=10`
	const response = useScrollPagination(page, setPage, apiUrl)

	const apiSearchUrl = '/v1/search'
	const [{ response: searchResponse }, doFetch] = useFetch(apiSearchUrl)

	useEffect(() => {
		if (searchValue !== '') {
			doFetch({
				method: 'post',
				data: `name=${searchValue}`,
			})
		}
	}, [doFetch, enterKeyPressed])

	if (searchValue === '') {
		return (
			<div className='container'>
				<div className='d-grid gap-5 mb-5 mt-5'>
					<div className='row'>
						{response && response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{searchResponse
						? searchResponse.data.map((anime: IAnimeResponseData) => (
								<AnimeCart anime={anime} key={anime.id} />
						  ))
						: response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeList
