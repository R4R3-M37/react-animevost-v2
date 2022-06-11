import React from 'react'
import './modal.css'

interface ModalProps {
	title: string
	target: string
	children: React.ReactNode
	footer: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, children, target, footer }) => {
	return (
		<div className='modal fade' id={target} tabIndex={-1} aria-labelledby={`${target}Label`} aria-hidden='true'>
			<div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button className='btn-close' data-bs-dismiss='modal' />
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>{footer}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
