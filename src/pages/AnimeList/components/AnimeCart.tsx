import React from 'react'
import { Link } from 'react-router-dom'
import { IAnimeResponseData } from '../../../types/types'

interface IAnimeCart {
	anime: IAnimeResponseData
}

const AnimeCart: React.FC<IAnimeCart> = ({ anime }) => {
	return (
		<div className='col col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
			<div className='mb-5 row'>
				<div className='col col-xxl-4 col-xl-4 col-lg-5 col-md-4 col-sm-5 col-12 d-flex justify-content-center'>
					<Link to={`/anime/${anime.id}`}>
						<div>
							<img alt='logo' className='preview' src={anime.urlImagePreview} loading='lazy' />
						</div>
						<div>
							<div className='progress'>
								<div
									className='progress-bar progress-bar-animated bg-success progress-bar-striped'
									role='progressbar'
									aria-valuenow={(anime.rating / anime.votes) * 20}
									aria-valuemin={0}
									aria-valuemax={100}
									style={{ width: (anime.rating / anime.votes) * 20 + '%' }}>
									{(anime.rating / anime.votes).toFixed(2)}
								</div>
								<div
									className='progress-bar bg-danger progress-bar-striped'
									role='progressbar'
									aria-valuenow={101 - (anime.rating / anime.votes) * 20}
									aria-valuemin={0}
									aria-valuemax={100}
									style={{
										width: 101 - (anime.rating / anime.votes) * 20 + '%',
									}}
								/>
							</div>
						</div>
					</Link>
				</div>
				<div className='col col-xxl-8 col-xl-8 col-lg-7 col-md-8 col-sm-7 col-12'>
					<Link to={`/anime/${anime.id}`} className='text-decoration-none'>
						<h4>{anime.title.split('/')[0]}</h4>
					</Link>
					<div>
						<h5>
							<Link to={`/anime/type/${anime.type.toLowerCase()}`} className='text-decoration-none'>
								{anime.type}
							</Link>{' '}
							/{' '}
							<Link to={`/anime/year/${anime.year}`} className='text-decoration-none'>
								{anime.year}
							</Link>{' '}
							/{' '}
							{anime.genre.split(',').map((a, index) => (
								<span className='me-2 mb-1 mt-1 badge bg-secondary' key={index}>
									<Link to={`/anime/genre/${a.trim()}`} className='link-light text-decoration-none'>
										{a}
									</Link>
								</span>
							))}
						</h5>
						<h5>{anime.title.split('[')[1].split(']')[0]}</h5>
					</div>
					<div className='description'>
						<span className='text-break'>{anime.description.replace(/(<br ?\/?>)*/g, '')}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeCart
