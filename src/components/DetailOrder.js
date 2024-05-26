import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const DetailOrder = () => {
	const orders = useSelector((state) => state.product.orderState);
	const { orderId } = useParams();
	const order = orders.filter((f) => f._id === orderId);
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('infomation-order')}>
					<h3>INFOMATION ORDER</h3>
					<p>UserId: {order[0]._id}</p>
					<p>Full Name: {order[0].customer.name}</p>
					<p>Phone: {order[0].customer.tel}</p>
					<p>Address: {order[0].customer.address}</p>
					<p>
						toltal:{' '}
						{order[0].totalPrice
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
						VND
					</p>
				</div>

				<div className={cx('container-product')}>
					<div className={cx('title')}>
						<p>ID PRODUCT</p>
						<p>IMAGE</p>
						<p>NAME</p>
						<p>PRICE</p>
						<p>COUNT</p>
					</div>
					{order[0].products?.map((item) => {
						return (
							<div className={cx('detail-product')}>
								<div className={cx('content')}>
									<p>{item._id}</p>
									<p>
										<img
											className={cx('image')}
											all='product-image'
											src={item.image}
										/>
									</p>
									<p>{item.name}</p>
									<p>
										{item.price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
										VND
									</p>
									<p>{item.quantity}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default DetailOrder;
