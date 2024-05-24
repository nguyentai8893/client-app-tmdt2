import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';

const cx = classNames.bind(styles);
const Modal = (props) => {
	return ReactDOM.createPortal(
		<div className={cx(`${props.isShowMess ? 'modal-mess' : 'modal'}`)}>
			{props.children}
		</div>,
		document.getElementById('portal-root')
	);
};

export default Modal;
