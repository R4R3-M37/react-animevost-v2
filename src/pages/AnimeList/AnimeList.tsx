import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { IAnimeResponseData } from '../../types/types'

import useScrollPagination from '../../hooks/useScrollPagination'
import AnimeCart from './components/AnimeCart'
import { SearchContext } from '../../context/SearchContext'
import { baseUrl } from '../../config'

const AnimeList: React.FC = () => {
	const [page, setPage] = useState<number>(1)

	const apiUrl: string = `last?page=${page}&quantity=10`
	const response = useScrollPagination(page, setPage, apiUrl)
	const [searchResponse, setSearchResponse] = useState<IAnimeResponseData[] | null>(null)

	const { searchValue, enterKeyPressed } = useContext(SearchContext)

	useEffect(() => {
		if (searchValue !== '') {
			axios.post(`${baseUrl}search`, `name=${searchValue}`).then((resp) => {
				setSearchResponse(resp.data.data)
			})
		}
	}, [enterKeyPressed])

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
						? searchResponse.map((anime: IAnimeResponseData) => <AnimeCart anime={anime} key={anime.id} />)
						: response.map((anime) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeList
