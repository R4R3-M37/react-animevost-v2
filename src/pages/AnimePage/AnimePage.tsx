import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import Spoiler from '../../components/Spoiler'

import { IAnimePageMediaResponse, IAnimeResponseData } from '../../types/types'
import MediaPlayer from './MediaPlayer'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const AnimePage: React.FC = () => {
	const { animeId } = useParams<{ animeId: string }>()
	const apiUrl: string = '/v1/info'
	const apiUrlMedia: string = '/v1/playlist'

	const [{ response }, doFetch] = useFetch(apiUrl)
	const [{ response: responseMedia }, doFetchMedia] = useFetch(apiUrlMedia)
	const [videoActive, setVideoActive] = useState(null)
	const [favoriteAnimeId, setFavoriteAnimeId] = useLocalStorage('favoriteAnimeId', '')

	const anime: IAnimeResponseData = response && response.data[0]

	const handleFavoriteButton = (id: any) => {
		if (favoriteAnimeId.includes(animeId)) {
			setFavoriteAnimeId(favoriteAnimeId.replace(id + ',', ''))
			// setFavoriteAnimeId(favoriteAnimeId.replace(id, '').repeat(',', '')) - очистить все
		} else {
			setFavoriteAnimeId(favoriteAnimeId + id + ',')
		}
	}

	const genre =
		anime &&
		anime.genre.split(',').map((a: string, index: number) => (
			<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
				<Link to={`/anime/genre/${a.trim()}`} className='text-decoration-none link-light'>
					{a}
				</Link>
			</span>
		))
	responseMedia &&
		responseMedia.sort((a: IAnimePageMediaResponse, b: IAnimePageMediaResponse) => {
			const matchA = a.name.match(/\d+/)
			const matchB = b.name.match(/\d+/)
			return matchA && matchB ? Number(matchA[0]) - Number(matchB[0]) : 1
		})

	useEffect(() => {
		doFetch({
			method: 'post',
			data: `id=${animeId}`,
		})
	}, [doFetch, animeId])

	useEffect(() => {
		doFetchMedia({
			method: 'post',
			data: `id=${animeId}`,
		})
	}, [doFetchMedia, animeId])

	useEffect(() => {
		if (!responseMedia) {
			return
		}
		setVideoActive(responseMedia[0].std)
	}, [responseMedia])

	if (!anime) {
		return null
	}

	return (
		<div className='container'>
			<div className='my-3 d-flex justify-content-center align-items-center'>
				<h4 className='text-center my-3'>{anime.title.split('/')[0]}</h4>
				<button className='btn btn-outline-secondary mx-3' onClick={() => handleFavoriteButton(animeId)}>
					{favoriteAnimeId.includes(animeId) ? 'Убрать' : 'Добавить'}
				</button>
			</div>
			<MediaPlayer src={videoActive} id={videoActive} />
			<Spoiler title={'Серии'} show>
				{responseMedia ? (
					responseMedia.map((anime: IAnimePageMediaResponse, index: number) => (
						<button
							onClick={() => setVideoActive(anime.std)}
							className={
								anime.std === videoActive
									? 'me-2 mb-1 mt-1 btn btn-secondary'
									: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
							}
							key={index}>
							{anime.name}
						</button>
					))
				) : (
					<code>Нет серий, Анонс?!</code>
				)}
			</Spoiler>
			<Spoiler title={'Жанр'}>
				<h5>{genre}</h5>
			</Spoiler>
			<Spoiler title={'Описание'}>{anime.description}</Spoiler>
			<Spoiler title={'Тип аниме'}>
				<Link to={`/anime/type/${anime.type.toLowerCase()}`} className='text-decoration-none'>
					{anime.type}
				</Link>
			</Spoiler>
			<Spoiler title={'Год выхода'}>
				<Link to={`/anime/year/${anime.year}`} className='text-decoration-none'>
					{anime.year}
				</Link>
			</Spoiler>
			<Spoiler title={'Создатель'}>{anime.director}</Spoiler>
		</div>
	)
}

export default AnimePage
