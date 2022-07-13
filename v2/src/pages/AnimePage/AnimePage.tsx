import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { IAnimeData, IAnimeMediaResponse, ISelectorState } from '../../types/types'

import MediaPlayer from './components/MediaPlayer'
import Spoiler from '../../components/Spoiler'
import GenresList from './components/GenresList'
import SeriesList from './components/SeriesList'

import { useGetAnimeMutation, useGetAnimePlaylistMutation } from '../../redux/query/useGetAnimeData'
import { addToFavorite, removeFromFavorite } from '../../redux/slices/favoriteAnimeSlice'


const AnimePage: React.FC = () => {
	const dispatch = useDispatch()
	const { animeID } = useParams<{ animeID: string }>()
	const { favoriteID } = useSelector((state: ISelectorState) => state.favoriteID)
	
	const [doFetchAnimeData, { data: animeArray }] = useGetAnimeMutation()
	const [doFetchPlaylist, { data: media }] = useGetAnimePlaylistMutation()
	const anime: IAnimeData = animeArray && animeArray[0]
	
	const [videoActive, setVideoActive] = useState<string>('')
	const [highDefinition, setHighDefinition] = useState<boolean>(false)
	
	const handleFavoriteButton = (id: string | undefined) => {
		if (favoriteID.includes(id as string)) {
			dispatch(removeFromFavorite(id))
		} else {
			dispatch(addToFavorite(id))
		}
	}
	
	const handleChangeHighDefinition = () => {
		setHighDefinition((highDefinition) => !highDefinition)
	}
	
	const series: IAnimeMediaResponse[] = media &&
		[...media].sort((a: IAnimeMediaResponse, b: IAnimeMediaResponse) => {
			const matchA = a.name.match(/\d+/)
			const matchB = b.name.match(/\d+/)
			return matchA && matchB ? Number(matchA[0]) - Number(matchB[0]) : 1
		})
	
	useEffect(() => {
		if (series) {
			if (highDefinition) {
				setVideoActive(series[0].hd)
			} else {
				setVideoActive(series[0].std)
			}
		}
	}, [series, highDefinition])
	
	useEffect(() => {
		doFetchAnimeData(animeID)
		doFetchPlaylist(animeID)
	}, [animeID])
	
	if (!anime) {
		return null
	}
	
	return (
		<div className='container'>
			<div className='my-3 d-flex justify-content-center align-items-center flex-row flex-wrap'>
				<h4 className='text-center my-3'>{anime.title.split('/')[0]}</h4>
				<button className='btn btn-outline-secondary mx-3' onClick={() => handleFavoriteButton(animeID)}>
					{favoriteID.includes(animeID as string) ? 'Убрать' : 'Добавить'}
				</button>
				<button className='btn btn-outline-secondary my-3' onClick={() => handleChangeHighDefinition()}>
					{highDefinition ? '(HD)' : '(STD)'}
				</button>
			</div>
			<MediaPlayer src={videoActive} id={videoActive} />
			<Spoiler title={'Серии'} show>
				<SeriesList series={series} videoActive={videoActive} setVideoActive={setVideoActive}
				            highDefinition={highDefinition} />
			</Spoiler>
			<Spoiler title={'Жанр'}>
				<h5><GenresList anime={anime} /></h5>
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
