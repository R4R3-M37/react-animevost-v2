import React from 'react'
import './modal.css'

interface ModalProps {
	title: string
	children: React.ReactNode
	activeModal: boolean
	setActiveModal: (activeModal: boolean) => void
}

const Modal: React.FC<ModalProps> = ({ title, children, activeModal, setActiveModal }) => {
	const handleClickOutside = () => {
		setActiveModal(false)
	}

	const handleClickX = () => {
		setActiveModal(false)
	}

	if (activeModal) {
		document.body.style.overflow = 'hidden'
	} else if (!activeModal) {
		document.body.style.overflow = 'auto'
	}

	return (
		<div
			className={activeModal ? 'modal fade show d-block active' : 'modal fade show d-block closed'}
			onClick={() => handleClickOutside()}
			tabIndex={-9999}>
			<div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button className='btn-close' onClick={() => handleClickX()} />
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' onClick={() => handleClickX()}>
							Закрыть
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
