import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { SearchContext } from '../../context/SearchContext'

import Modal from './Modal'

const Navbar: React.FC = () => {
	const [modalActive, setModalActive] = useState(false)

	const { searchValue, setSearchValue, setEnterKeyPressed } = useContext(SearchContext)

	const handleModalActive = () => {
		setModalActive(true)
	}

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			return setEnterKeyPressed((enterKeyPressed: boolean) => !enterKeyPressed)
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
					data-bs-target='#navbarSupportedContent'>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link to={'#'} className='nav-link' onClick={() => handleModalActive()}>
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
						<input
							className='form-control'
							type='search'
							name='search'
							placeholder='Найти аниме'
							onKeyPress={(e) => handleKeyPress(e)}
							value={searchValue}
							onChange={(e) => onChangeSearch(e)}
						/>
					</ul>
				</div>
				<Modal title={'О сайте'} activeModal={modalActive} setActiveModal={setModalActive}>
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
			</div>
		</nav>
	)
}

export default Navbar
