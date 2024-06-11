import React from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedProducts.module.scss';
const cx = classNames.bind(styles);

const RelatedProducts = ({ item }) => {
	return (
		<>
			<div className={cx('container')}>
				<img src={item?.img1} alt='image product' />
				<p className={cx('name')}>{item?.name}</p>
				<p className={cx('price')}>
					{item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
				</p>
			</div>
		</>
	);
};

export default RelatedProducts;
