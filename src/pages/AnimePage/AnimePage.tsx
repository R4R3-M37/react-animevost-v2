import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { IAnimePageMediaResponse, IAnimeResponseData } from '../../types/types'

import MediaPlayer from './MediaPlayer'
import Spoiler from '../../components/Spoiler'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import { baseUrl } from '../../config'

const AnimePage: React.FC = () => {
	const { animeId } = useParams<{ animeId: string }>()

	const [response, setResponse] = useState<IAnimeResponseData[]>([])
	const [responseMedia, setResponseMedia] = useState<IAnimePageMediaResponse[] | null>(null)

	const [videoActive, setVideoActive] = useState<string>('')
	const [highDefinition, setHighDefinition] = useState<boolean>(false)

	const [favoriteAnimeId, setFavoriteAnimeId] = useLocalStorage('favoriteAnimeId', '')

	const handleFavoriteButton = (id: string | undefined) => {
		if (favoriteAnimeId.includes(animeId)) {
			setFavoriteAnimeId(favoriteAnimeId.replace(id + ',', ''))
		} else {
			setFavoriteAnimeId(favoriteAnimeId + id + ',')
		}
	}

	const handleChangeHighDefinition = () => {
		setHighDefinition((highDefinition) => !highDefinition)
	}

	const anime: IAnimeResponseData = response && response[0]

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
		if (responseMedia) {
			if (highDefinition) {
				setVideoActive(responseMedia[0].hd)
			} else {
				setVideoActive(responseMedia[0].std)
			}
		}
	}, [responseMedia, highDefinition])

	useEffect(() => {
		axios.post(`${baseUrl}info`, `id=${animeId}`).then((resp) => {
			setResponse(resp.data.data)
		})
	}, [])

	useEffect(() => {
		axios.post(`${baseUrl}playlist`, `id=${animeId}`).then((resp) => {
			setResponseMedia(resp.data)
		})
	}, [])

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
				<button className='btn btn-outline-secondary my-3' onClick={() => handleChangeHighDefinition()}>
					Сменить качество {highDefinition ? '(HD)' : '(STD)'}
				</button>
			</div>
			<MediaPlayer src={videoActive} id={videoActive} />
			<Spoiler title={'Серии'} show>
				{responseMedia ? (
					responseMedia.map((anime: IAnimePageMediaResponse, index: number) => (
						<button
							onClick={() => setVideoActive(highDefinition ? anime.hd : anime.std)}
							className={
								highDefinition
									? anime.hd === videoActive
										? 'me-2 mb-1 mt-1 btn btn-secondary'
										: 'me-2 mb-1 mt-1 btn btn-outline-secondary'
									: anime.std === videoActive
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
