import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CartPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { productAction } from '../store/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeftLong,
	faArrowRightLong,
	faCaretLeft,
	faCaretRight,
	faGift,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAxios from '../hook/useAxios';
const cx = classNames.bind(styles);

const apiUrl = process.env.REACT_APP_API_URL;
const CartPage = () => {
	const selectedProducts = useSelector(
		(state) => state.product.selectedProducts
	);
	const [totalQTT, setToltalQTT] = useState(null);
	const [debounceTimer, setDebounceTimer] = useState(null);
	const dispatch = useDispatch();
	const cartStateRedux = useSelector((state) => state.product.cartState);
	const { apiRequest } = useAxios();
	// Lấy dữ liệu từ local storage và chuyển thành mảng
	const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
	const cartState =
		cartStateRedux.length > 0 ? cartStateRedux : storedCartItems;

	// hàm sử lý tăng giảm quantity và update cartItems
	const handlerDecremen = (id) => {
		const product = cartStateRedux.find((item) => item.idProduct === id);
		if (!product || product.quantity < 1) return;
		const newQuantity = product.quantity - 1;
		dispatch(
			productAction.updateCartItemQuantity({
				idProduct: product.idProduct,
				quantity: newQuantity,
			})
		);
		setToltalQTT(newQuantity);
		handleDebounceUpdateQuantity(product.idProduct, product.idUser, totalQTT);
	};
	const handlerIncremen = (id) => {
		const product = cartStateRedux.find((item) => item.idProduct === id);
		if (!product) return;

		const newQuantity = product.quantity + 1;
		dispatch(
			productAction.updateCartItemQuantity({
				idProduct: product.idProduct,
				quantity: newQuantity,
			})
		);
		setToltalQTT(newQuantity);

		handleDebounceUpdateQuantity(product.idProduct, product.idUser, totalQTT);
	};

	// xóa sản phẩm khỏi cart
	const handlerRemove = async (id) => {
		try {
			const res = await apiRequest(
				`${apiUrl}/api/delete-product/${id}`,
				'delete'
			);
			if (res.status === 200) {
				dispatch(productAction.cartItem(res.cartItems));
			}
		} catch (error) {}
	};

	const updateProductQuantity = async (idProduct, idUser, newQuantity) => {
		try {
			const res = await apiRequest(`${apiUrl}/api/update-product`, 'post', {
				idUser,
				idProduct,
				newQuantity,
			});
			if (res.status === 200) {
				dispatch(productAction.cartItem(res.updateCart));
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDebounceUpdateQuantity = (idProduct, idUser, newQuantity) => {
		// Clear timeout cũ nếu có
		if (debounceTimer) clearTimeout(debounceTimer);
		// Set timeout mới
		const timer = setTimeout(() => {
			updateProductQuantity(idProduct, idUser, newQuantity);
		}, 10000);
		setDebounceTimer(timer);
	};
	const handleCheck = (id) => {
		dispatch(productAction.selectProduct(id));
	};
	let total;
	let totalSub = 0;
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('banner')}>
					<p>CART</p>
					<p>CART</p>
				</div>
				<div className={cx('shoping-cart')}>
					<h4>SHOPING CART</h4>
					<div className={cx('cart')}>
						<div className={cx('cart-content')}>
							<div className={cx('title')}>
								<p>#</p>
								<p>IMAGE</p>
								<p>PRODUCT</p>
								<p>PRICE</p>
								<p>QUANTITY</p>
								<p>TOTAL</p>
								<p>REMOVE</p>
							</div>

							{cartState?.map((item, index) => {
								{
									total = item.quantity * item.price;
								}
								{
									totalSub += total;
								}

								return (
									<div key={index} className={cx('cart-product')}>
										<input
											type='checkbox'
											checked={selectedProducts.includes(item.idProduct)}
											onChange={() => handleCheck(item.idProduct)}
										/>
										<img src={item.image} alt='image' />
										<p className={cx('name')}>{item.name}</p>
										<p className={cx('price')}>
											{item.price
												?.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
											VND
										</p>
										<div className={cx('quantity')}>
											<FontAwesomeIcon
												className={cx('icon')}
												onClick={() => handlerDecremen(item.idProduct)}
												icon={faCaretLeft}
											/>
											<p>{item.quantity}</p>
											<FontAwesomeIcon
												className={cx('icon')}
												onClick={() => handlerIncremen(item.idProduct)}
												icon={faCaretRight}
											/>
										</div>
										<p className={cx('total')}>
											{item.totalPrice
												?.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
											VND
										</p>
										{/* <p>{item.quantity}</p> */}
										<p className={cx('remove')}>
											<FontAwesomeIcon
												className={cx('icon')}
												icon={faTrashCan}
												onClick={() => {
													handlerRemove(item.idProduct);
												}}
											/>
										</p>
									</div>
								);
							})}
						</div>
						<div className={cx('cart-total')}>
							<h4>CART TOTAL</h4>
							<div className={cx('sub-total')}>
								<h6>SUB TOTAL</h6>
								<p>
									{totalSub?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
									VND
								</p>
							</div>
							<div className={cx('totals')}>
								<h6>TOTAL</h6>
								<p>
									{totalSub?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
									VND
								</p>
							</div>
							<div className={cx('input')}>
								<input placeholder='Enter your Coupon' />
								<button>
									<FontAwesomeIcon className={cx('icon')} icon={faGift} /> Apply
									Coupon
								</button>
							</div>
						</div>
						<div className={cx('navigation')}>
							<Link className={cx('navigation-icon')} to='/shop'>
								<FontAwesomeIcon
									className={cx('icon')}
									icon={faArrowLeftLong}
								/>
								<p>Continue Shopping</p>
							</Link>
							<Link to='/checkout' className={cx('navigation-icon')}>
								<p>Proceed to checkout</p>
								<FontAwesomeIcon
									className={cx('icon')}
									icon={faArrowRightLong}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartPage;
