import React from 'react';

import classNames from 'classnames/bind';
import styles from './ProductListItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductListItem = ({ items }) => {
	return (
		<>
			<div className={cx('container')}>
				{/* chuyển hướng trang */}
				<Link to={`/detail/${items?._id}`}>
					<img src={items?.img1} alt='product image' />
				</Link>

				<div className={cx('name-price')}>
					<p className={cx('name')}>{items?.name}</p>
					<p className={cx('price')}>
						{items?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND
					</p>
				</div>
			</div>
		</>
	);
};

export default ProductListItem;
