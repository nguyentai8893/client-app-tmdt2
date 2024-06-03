import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import RelatedProducts from './RelatedProducts';
import useAxios from '../hook/useAxios';
import { productAction } from '../store/productSlice';
const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const DetailPage = () => {
	const { id } = useParams();
	const [inputValue, setInputValue] = useState(1);
	const products = useSelector((state) => state.product.products);
	const currentCategory = useSelector((state) => state.product.currentCategory);
	const user = JSON.parse(localStorage.getItem('user')) || [];
	const { apiRequest } = useAxios();

	const dispatch = useDispatch();
	const product = products.find((product) => product._id === id);
	const relatedProducts =
		currentCategory === 'All'
			? products
			: products.filter((fil) => fil.category === currentCategory);

	const handlerDecremen = () => {
		if (inputValue > 1) {
			setInputValue(inputValue - 1);
		}
	};
	const handlerIncremen = () => {
		setInputValue(inputValue + 1);
	};
	// sử lý khi clik nút add cart
	const handlerAddCart = async () => {
		const postData = {
			userId: user._id,
			product,
			quantity: inputValue,
		};
		const res = await apiRequest(`${apiUrl}/api/add-cart`, 'post', postData);
		if (res.status == 200) {
			dispatch(productAction.cartItem(res.userCart));
		}
	};
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-product')}>
					<div className={cx('image')}>
						<img alt='product' src={product?.img1} />
					</div>
					<div className={cx('text')}>
						<h4>{product?.name}</h4>
						<p className={cx('price')}>
							{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
							VND
						</p>
						<p className={cx('long-dec')}>{product?.short_desc}</p>
						<div className={cx('dflex')}>
							CATEGORY: <p>{product?.category}</p>
						</div>

						<div className={cx('container-btn')}>
							<input type='text' placeholder='QUANTITY' />
							<div className={cx('flex-icon')}>
								<FontAwesomeIcon
									className={cx('icon')}
									onClick={handlerDecremen}
									icon={faCaretLeft}
								/>
								<p>{inputValue}</p>
								<FontAwesomeIcon
									className={cx('icon')}
									onClick={handlerIncremen}
									icon={faCaretRight}
								/>
							</div>
							<button onClick={() => handlerAddCart()}>Add to cart</button>
						</div>
					</div>
				</div>
				<div className={cx('related-product')}>
					<button>DESCRIPTION</button>
					<p className={cx('related-long_desc')}>{product?.long_desc}</p>

					<div className={cx('container-related')}>
						<p className={cx('related-title')}>RELATED PRODUCTS</p>
						<div className={cx('related')}>
							{relatedProducts.map((item, index) => {
								return <RelatedProducts item={item} key={index} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetailPage;
