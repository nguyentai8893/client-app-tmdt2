import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { popupAction } from '../store//showHideSlice';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

const ProductItem = ({ item }) => {
	const dispatch = useDispatch();
	// sử lý show modal
	const handlerPopup = () => {
		dispatch(popupAction.showPopup(item));
	};
	return (
		<>
			<div className={cx('container')}>
				<img onClick={handlerPopup} src={item.img1} alt='product image' />
				<div className={cx('wraper')}>
					<p className={cx('name-product')}>{item.name}</p>
					<p className={cx('price-product')}>
						{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
					</p>
				</div>
			</div>
		</>
	);
};

export default ProductItem;
