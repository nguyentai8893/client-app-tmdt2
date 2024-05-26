import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HistoryNavbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import productSlice from '../store/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const HistoryNavbar = () => {
	const dispatch = useDispatch();
	const order = useSelector((state) => state.product.orderState);
	useEffect(() => {
		if (!order) {
			dispatch(
				productSlice.order(JSON.parse(localStorage.getItem('order') || []))
			);
		}
	}, [dispatch, order]);
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('banner')}>
					<p>HISTORY</p>
					<p>HISTORY</p>
				</div>
				<div className={cx('shoping-cart')}>
					<h3>HISTORY ORDER : </h3>
					<div className={cx('cart')}>
						<div className={cx('cart-content')}>
							<div className={cx('title')}>
								<p>ID ORDER</p>
								<p>ID USER</p>
								<p>NAME</p>
								<p>PHONE</p>
								<p>ADDRESS</p>
								<p>TOTAL</p>
								<p>DELIVERY</p>
								<p>STATUS</p>
								<p>DETAIL</p>
							</div>

							{order?.map((item, index) => {
								console.log(item._id);
								return (
									<div key={index} className={cx('cart-product')}>
										<p className={cx('name')}>{item._id}</p>
										<p className={cx('price')}>{item.customer.idUser}</p>
										<div className={cx('quantity')}>
											<p>{item.customer.name}</p>
										</div>
										<p className={cx('tel')}>{item.customer.tel}</p>
										<p className={cx('address')}>{item.customer.address}</p>
										<p className={cx('total')}>
											{item.totalPrice
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
											VND
										</p>
										<p className={cx('deli')}>deliprice</p>
										<p className={cx('status')}>{item.status}</p>
										<p className={cx('detail')}>
											<Link to={`/detailOrder/${item._id}`}>
												<button>
													Detail
													<FontAwesomeIcon
														className={cx('icon')}
														icon={faRightLong}
													/>
												</button>
											</Link>
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HistoryNavbar;
