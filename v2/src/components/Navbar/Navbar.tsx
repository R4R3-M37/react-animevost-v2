import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { allAnimeGenres, allAnimeTypes, allAnimeYears } from '../../config'
import { setSearchActive, setSearchInput } from '../../redux/slices/searchSlice'
import Modal from './Modal'
import ModalSetParams from './ModalSetParams'
import { ISelectorState } from '../../types/types'


const Navbar: React.FC = () => {
	const dispatch = useDispatch()
	const { search } = useSelector((state: ISelectorState) => state)
	
	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchInput(e.target.value))
	}
	
	const handleSearchActive = () => {
		dispatch(setSearchActive())
	}
	
	const handleInputSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			dispatch(setSearchActive())
		}
	}
	
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
					data-bs-target='#navbarSupportedContent'
				>
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
								data-bs-target='#searchModal'
							>
								Расширенный поиск
							</Link>
						</li>
						<input
							className='form-control'
							type='search'
							name='search'
							placeholder='Найти аниме'
							onKeyDown={(e) => handleInputSearchKeyPress(e)}
							value={search.searchInput}
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
					}
				>
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
								onClick={handleSearchActive}
								data-bs-dismiss='modal'
							>
								Поиск
							</button>
						</Link>
					}
				>
					<div className='container'>
						<ModalSetParams current={search.type} title={'Тип'} array={allAnimeTypes} />
						<ModalSetParams current={search.genre} title={'Жанр'} array={allAnimeGenres} />
						<ModalSetParams current={search.year} title={'Год'} array={allAnimeYears} />
					</div>
				</Modal>
			</div>
		</nav>
	)
}

export default Navbar
