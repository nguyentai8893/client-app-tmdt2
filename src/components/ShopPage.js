import classNames from 'classnames/bind';
import styles from './ShopPage.module.scss';
import ProductListItem from './ProductListItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { productAction } from '../store/productSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

const ShopPage = () => {
	const dispatch = useDispatch();
	const currentCategory = useSelector((state) => state.product.currentCategory);
	const products = useSelector((state) => state.product.products);
	const handlerCategory = (category) => {
		dispatch(productAction.setCategory(category));
	};
	useEffect(() => {
		const storedProducts = JSON.parse(localStorage.getItem('products'));
		if (storedProducts) {
			dispatch(productAction.setProduct(storedProducts));
		}
	}, []);
	// sử lý render product theo category
	const filterProducts =
		currentCategory === 'All'
			? products
			: products.filter((product) => product.category === currentCategory);
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('banner-shop')}>
					<p>SHOP</p>
					<p>SHOP</p>
				</div>
				<div className={cx('content')}>
					<div className={cx('navbar')}>
						<h4>CATEGORIES</h4>
						<div>
							<div className={cx('navbar-title')}>
								<h5>APPLE</h5>
							</div>
							<p onClick={() => handlerCategory('All')}>All</p>
						</div>
						<div>
							<div className={cx('title')}>
								<h5>IPHONE & MAC</h5>
							</div>

							<p onClick={() => handlerCategory('iphone')}>Iphone</p>
							<p onClick={() => handlerCategory('ipad')}>Ipad</p>
							<p onClick={() => handlerCategory('macbook')}>Macbook</p>
						</div>
						<div>
							<div className={cx('title')}>
								<h5>WIRELESS</h5>
							</div>
							<p onClick={() => handlerCategory('airpod')}>Airpod</p>
							<p onClick={() => handlerCategory('watch')}>Watch </p>
						</div>
						<div>
							<div className={cx('title')}>
								<h5>OTHER</h5>
							</div>
							<p onClick={() => handlerCategory('mouse')}>Mouse</p>
							<p onClick={() => handlerCategory('keyboard')}>keyboard </p>
							<p onClick={() => handlerCategory('other')}>Other </p>
						</div>
					</div>
					<div className={cx('product-container')}>
						<div className={cx('search-product')}>
							<input
								className={cx('search-input')}
								placeholder='Enter search here!'
							/>
							<select className={cx('select')}>
								<option>default sorting</option>
							</select>
						</div>
						<div className={cx('product')}>
							{filterProducts?.map((items, index) => {
								return <ProductListItem items={items} key={index} />;
							})}
							{filterProducts.length > 0 && (
								<div className={cx('next-page')}>
									<div className={cx('page')}>
										<button>
											<FontAwesomeIcon icon={faAngleDoubleLeft} />
										</button>
										<p>2</p>
										<button>
											<FontAwesomeIcon icon={faAngleDoubleRight} />
										</button>
									</div>

									<div>
										<span className={cx('show')}>Showing 1-9 of 9 results</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShopPage;
