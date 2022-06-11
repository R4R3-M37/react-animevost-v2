import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Modal from './Modal'
import { SearchContext } from '../../context/SearchContext'
import { allAnimeGenres, allAnimeTypes, allAnimeYears } from '../../config'

const Navbar: React.FC = () => {
	const {
		searchValue,
		setSearchValue,
		setEnterKeyPressed,
		setSearchActive,
		activeAnimeType,
		setActiveAnimeType,
		activeAnimeGenre,
		setActiveAnimeGenre,
		activeAnimeYear,
		setActiveAnimeYear,
	} = useContext(SearchContext)

	const handleSetActiveType = (type: string): void => {
		setActiveAnimeType(type)
	}

	const handleSetActiveGenre = (genre: string): void => {
		setActiveAnimeGenre(genre)
	}

	const handleSetActiveYear = (year: number | string): void => {
		setActiveAnimeYear(year)
	}

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(e.target.value)
	}

	const handleSearchActive = (): void => {
		setSearchActive((searchActive: boolean) => !searchActive)
	}

	const handleInputSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.code === 'Enter') {
			setEnterKeyPressed((enterKeyPressed: boolean) => !enterKeyPressed)
		}
	}
	console.log(activeAnimeYear)
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link className='navbar-brand' to={'/'}>
					Animevost
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link to={'#'} className='nav-link' data-bs-toggle='modal' data-bs-target='#aboutModal'>
								О сайте
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={'/anime/favorite'} className='nav-link'>
								Мои аниме
							</Link>
						</li>
						<li className='nav-item'>
							<Link to={'/anime/schedule'} className='nav-link'>
								Расписание
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to={'/search'}
								className='nav-link'
								data-bs-toggle='modal'
								data-bs-target='#searchModal'>
								Расширеный поиск
							</Link>
						</li>
						<input
							className='form-control'
							type='search'
							name='search'
							placeholder='Найти аниме'
							onKeyPress={(e) => handleInputSearchKeyPress(e)}
							value={searchValue}
							onChange={(e) => onChangeSearch(e)}
						/>
					</ul>
				</div>
				<Modal
					title={'О сайте'}
					target={'aboutModal'}
					footer={
						<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
							Закрыть
						</button>
					}>
					Автор:{' '}
					<a href='https://github.com/r3t4k3r'>
						<b>r3t4k3r</b>
					</a>
					<br />
					Реализация автора:{' '}
					<a href='https://github.com/r3t4k3r/animevost-web'>
						<b>github.com/animevost-web</b>
					</a>
					<br />
					Исходный код:{' '}
					<a href='https://github.com/R4R3-M37/react-animevost-web'>
						<b>github.com/react-animevost-v2</b>
					</a>
				</Modal>
				<Modal
					title={'Расширеный поиск'}
					target={'searchModal'}
					footer={
						<Link to={'/anime/search'}>
							<button
								type='button'
								className='btn btn-primary'
								onClick={() => handleSearchActive()}
								data-bs-dismiss='modal'>
								Поиск
							</button>
						</Link>
					}>
					<div className='container'>
						<div>
							<div>
								<strong>Тип:</strong>
							</div>
							<div className='d-flex overflow-auto align-items-center'>
								<button
									className={activeAnimeType === '' ? 'btn btn-primary' : 'btn btn-outline-primary'}
									onClick={() => handleSetActiveType('')}>
									-
								</button>
								{allAnimeTypes.map((type, index) => (
									<div className='mx-1' key={index}>
										<input
											type='radio'
											className='btn-check'
											checked={activeAnimeType === type}
											onChange={() => handleSetActiveType(type)}
										/>
										<label
											className='btn btn-outline-primary'
											onClick={() => handleSetActiveType(type)}>
											{type}
										</label>
									</div>
								))}
							</div>
						</div>
						<div>
							<div>
								<strong>Жанр:</strong>
							</div>
							<div className='d-flex overflow-auto align-items-center'>
								<button
									className={activeAnimeGenre === '' ? 'btn btn-primary' : 'btn btn-outline-primary'}
									onClick={() => handleSetActiveGenre('')}>
									-
								</button>
								{allAnimeGenres.map((genre, index) => (
									<div className='mx-1' key={index}>
										<input
											type='radio'
											className='btn-check'
											checked={activeAnimeGenre === genre}
											onChange={() => handleSetActiveGenre(genre)}
										/>
										<label
											className='btn btn-outline-primary'
											onClick={() => handleSetActiveGenre(genre)}>
											{genre}
										</label>
									</div>
								))}
							</div>
						</div>
						<div>
							<div>
								<strong>Год:</strong>
							</div>
							<div className='d-flex overflow-auto'>
								<button
									className={activeAnimeYear === 0 ? 'btn btn-primary' : 'btn btn-outline-primary'}
									onClick={() => handleSetActiveYear(0)}>
									-
								</button>
								{allAnimeYears.map((year, index) => (
									<div className='mx-1' key={index}>
										<input
											type='radio'
											className='btn-check'
											checked={activeAnimeYear === year}
											onChange={() => handleSetActiveYear(year)}
										/>
										<label
											className='btn btn-outline-primary'
											onClick={() => handleSetActiveYear(year)}>
											{year}
										</label>
									</div>
								))}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		</nav>
	)
}

export default Navbar
