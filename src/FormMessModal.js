import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './FormMessModal.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const FormMessModal = () => {
	const isOpen = useSelector((state) => state.popup.isShowForm);
	return ReactDOM.createPortal(
		<div className={cx('modal-form')}>
			<div className={cx(`form-content + ${isOpen ? 'open' : ''}`)}>asfdfx</div>
		</div>,
		document.getElementById('portal-message')
	);
};

export default FormMessModal;
