import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import AnimeCart from './components/AnimeCart'

import { IAnimeResponseData } from '../../types/types'

const AnimeByYear: React.FC = () => {
	const { year } = useParams<{ year: string }>()
	const apiUrl: string = '/v1/search'
	const [{ response }, doSearch] = useFetch(apiUrl)

	useEffect(() => {
		doSearch({
			method: 'post',
			data: `year=${year}`,
		})
	}, [doSearch, year])

	return (
		<div className='container'>
			<div className='d-grid gap-5 mb-5 mt-5'>
				<div className='row'>
					{response &&
						response.data.map((anime: IAnimeResponseData) => <AnimeCart anime={anime} key={anime.id} />)}
				</div>
			</div>
		</div>
	)
}

export default AnimeByYear
