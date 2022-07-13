import React from 'react'
import { useDispatch } from 'react-redux'

import { setGenre, setType, setYear } from '../../redux/slices/searchSlice'


interface IModalParamsProps {
	current: string | number
	title: string
	array: string[] | number[]
}

const ModalSetParams: React.FC<IModalParamsProps> = ({ current, title, array }) => {
	const dispatch = useDispatch()
	const handleSetActive = (param: string | number) => {
		if (title === 'Тип') {
			dispatch(setType(param))
		}
		if (title === 'Жанр') {
			dispatch(setGenre(param))
		}
		if (title === 'Год') {
			dispatch(setYear(param))
		}
	}
	
	return (
		<div>
			<div>
				<strong>{title}:</strong>
			</div>
			<div className='d-flex overflow-auto align-items-center'>
				<button
					className={current === '' ? 'btn btn-primary' : 'btn btn-outline-primary'}
					onClick={() => handleSetActive('')}
				>
					-
				</button>
				{array.map((type, index) => (
					<div className='mx-1' onClick={() => handleSetActive(type)} key={index}>
						<input
							type='radio'
							className='btn-check'
							checked={current === type}
						/>
						<label
							className='btn btn-outline-primary'
						>
							{type}
						</label>
					</div>
				))}
			</div>
		</div>
	)
}

export default ModalSetParams