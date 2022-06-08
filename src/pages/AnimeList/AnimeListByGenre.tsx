import React, { useEffect } from 'react'
import { IAnimeResponseData } from '../../types/types'
import AnimeCart from './components/AnimeCart'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const AnimeListByGenre: React.FC = () => {
	const { genre } = useParams<{ genre: string }>()

	const apiUrl: string = '/v1/search'
	const [{ response }, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `gen=${genre}`,
		})
	}, [doFetch, genre])

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

export default AnimeListByGenre
