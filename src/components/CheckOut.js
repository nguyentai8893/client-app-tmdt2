import React, { memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
import { useSelector } from 'react-redux';
import useAxios from '../hook/useAxios';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const CheckOut = () => {
	const products = useSelector((state) => state.product.products);
	const cartState = useSelector((state) => state.product.cartState);
	const checked = useSelector((state) => state.product.selectedProducts);

	// Lọc ra các sản phẩm có id trùng khớp với id trong mảng checked
	const selectedProducts = cartState.filter((product) =>
		checked.includes(product.idProduct)
	);
	const { apiRequest } = useAxios();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		tel: '',
		address: '',
	});

	const changeOrder = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	// Hàm tính tổng giá trị đơn hàng
	const calculateTotalPrice = (products) => {
		let totalPrice = 0;
		products.forEach((product) => {
			totalPrice += product.price * product.quantity;
		});
		return totalPrice;
	};
	const orderData = {
		customer: {
			idUser: selectedProducts[0]?.idUser,
			name: formData.name,
			email: formData.email,
			tel: formData.tel,
			address: formData.address,
		},
		products: selectedProducts,
		totalPrice: calculateTotalPrice(selectedProducts),
		status: 'Đã đặt hàng', // Trạng thái ban đầu của đơn hàng
		orderDate: new Date(), // Thời gian đặt hàng
	};
	const orderHandler = async () => {
		try {
			// Kiểm tra số lượng sản phẩm trong kho
			const enoughStock = selectedProducts.every((product) => {
				const productInStock = products.find(
					(item) => item._id === product.idProduct
				);
				return productInStock && product.quantity <= productInStock.quantity;
			});
			// Nếu số lượng sản phẩm không đủ trong kho
			if (!enoughStock) {
				alert(
					'Một số sản phẩm đã hết hàng hoặc số lượng vượt quá số lượng có sẵn.!'
				);
				return;
			}

			// Nếu số lượng sản phẩm đủ trong kho, thực hiện đặt hàng
			const res = await apiRequest(
				`${apiUrl}/api/order-product`,
				'post',
				orderData
			);
			if (res.success === true) {
				alert('Đặt hàng thành công !!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	let totalProduct = 0;
	let total = 0;

	return (
		<div className={cx('container')}>
			<div className={cx('banner-shop')}>
				<p className={cx('checkout-text')}>CHECKOUT</p>
				<div className={cx('checkout-link')}>
					<p className={cx('checkout-home-cart')}>HOME /</p>
					<p className={cx('checkout-home-cart')}> CART /</p>
					<p className={cx('checkout')}> CHECKOUT</p>
				</div>
			</div>
			<div className={cx('container-form')}>
				<h4>BILLING DETAILS</h4>
				<div className={cx('flex-item')}>
					<div className={cx('form-input')}>
						<form>
							<label>
								<p>FULL NAME:</p>
								<input
									placeholder='Enter Your FullName Here!'
									type='name'
									name='name'
									onChange={changeOrder}
								/>
							</label>
							<br />
							<label>
								<p>EMAIL:</p>
								<input
									placeholder='Enter Your Email Here!'
									type='email'
									name='email'
									onChange={changeOrder}
								/>
							</label>
							<br />
							<label>
								<p>NUMBER PHONE:</p>
								<input
									placeholder='Enter Your Number Phone Here!'
									type='tel'
									name='tel'
									onChange={changeOrder}
								/>
							</label>
							<br />
							<label>
								<p>ADDRESS:</p>
								<input
									placeholder='Enter Your Address Here!'
									type='text'
									name='address'
									onChange={changeOrder}
								/>
							</label>
							<button type='button' onClick={orderHandler}>
								Place Order
							</button>
						</form>
					</div>
					<div className={cx('your-order')}>
						<h4>YOUR ORDER </h4>
						{selectedProducts?.map((item, index) => {
							total = item.price * item.quantity;
							totalProduct += total;
							return (
								<div className={cx('total-price')} key={index}>
									<p className={cx('name')}>{item.name}</p>
									<p className={cx('price')}>
										{item.price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
										VND x {item.quantity}
									</p>
								</div>
							);
						})}
						<div className={cx('total-product')}>
							<p>TOTAL</p>
							<p className={cx('total-price-product')}>
								{totalProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
								VND
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(CheckOut);
