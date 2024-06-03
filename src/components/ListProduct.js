import ProductItem from './ProductItem';
import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import { popupAction } from '../store/showHideSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const ListProduct = () => {
	const isShow = useSelector((state) => state.popup.isShowPopup);
	const product = useSelector((state) => state.popup.selectProduct);
	const products = useSelector((state) => state.product.products);
	const dispatch = useDispatch();
	// sử lý đóng modal
	const handlerCloseModal = () => {
		dispatch(popupAction.closeModal());
	};
	return (
		<div className={cx('container')}>
			<div className={cx('title')}>
				<p> MADE THE HARD WAY</p>
				<h3>TOP TRENDING PRODUCTS</h3>
			</div>
			<div className={cx('content')}>
				{products?.map((item) => {
					return <ProductItem item={item} key={item._id} />;
				})}
			</div>
			{isShow && <div className={cx('overlay')}></div>}
			{isShow && (
				<Modal>
					<>
						<div className={cx('container-modal')}>
							<div className={cx('content-left')}>
								<img src={product.img1} alt='product' />
							</div>
							<div className={cx('content-right')}>
								<div className={cx('btn-close')}>
									<button onClick={handlerCloseModal}>X</button>
								</div>
								<div className={cx('content-text')}>
									<p className={cx('name')}>{product.name}</p>
									<p className={cx('price')}>
										{product.price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
										VND
									</p>
									<p className={cx('short-desc')}>{product.short_desc}</p>
								</div>

								<button className={cx('btn')}>
									<FontAwesomeIcon
										icon={faCartShopping}
										className={cx('icon')}
									/>
									View Detail
								</button>
							</div>
						</div>
					</>
				</Modal>
			)}
		</div>
	);
};

export default ListProduct;
