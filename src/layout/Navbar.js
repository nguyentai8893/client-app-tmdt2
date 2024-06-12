import React, { memo, useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCartFlatbed,
	faSortDown,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../store/loginUserSlice';
import { productAction } from '../store/productSlice';

const Navbar = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	const productCart = useSelector((state) => state.product.productCart);
	// const isLogin = useSelector((state) => state.auth.isLogin);
	const cartState = useSelector((state) => state.product.cartState);
	const [user, setUser] = useState(null);
	// const [cartItem, setCartItems] = useState([]);
	// const user = useSelector((state) => state.auth.user);
	// if (!user) {
	// 	dispatch(
	// 		loginAction.onLogin(JSON.parse(localStorage.getItem('user')) || [])
	// 	);
	// }

	const navigate = useNavigate();
	// const [isLoggein, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
		// setCartItems(storedCartItems);
		const user = JSON.parse(localStorage.getItem('user')) || [];
		if (user) {
			setUser(user);
		}
	}, [dispatch, products, productCart]);

	const handlerLogout = () => {
		const confirmLogout = window.confirm(
			'Bạn có chắc chắn muốn đăng xuất không?'
		);
		if (confirmLogout) {
			document.cookie =
				'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=yourdomain.com';
			dispatch(loginAction.onLogout());
			dispatch(productAction.ressetState());
			// setIsLoggedIn(false);
			navigate('/sign-up');
		}
	};

	const classlogin = user ? classes.flexCartUser : classes.flexCart;
	const classloginUser = user ? classes.loginWidth : classes.login;
	const classloginCart = user ? classes.cartLogin : classes.cart;
	const cartNumber = cartState ? cartState.length : 0;
	return (
		<div className={classes.navbar}>
			<div className={classes.flex}>
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive ? classes.active : classes.nav
					}
				>
					<p className={classes.text}>Home</p>
				</NavLink>

				<NavLink
					to='/shop'
					className={({ isActive }) =>
						isActive ? classes.active : classes.nav
					}
				>
					<p>Shop</p>
				</NavLink>

				<NavLink
					to='/history'
					className={({ isActive }) =>
						isActive ? classes.active : classes.nav
					}
				>
					<p>History</p>
				</NavLink>
			</div>

			<div className={classes.flexBoutique}>
				<p className={classes.boutique}>BOUTIQUE</p>
			</div>
			<div className={classlogin}>
				<div className={classloginCart}>
					<NavLink
						to='cart'
						className={({ isActive }) =>
							isActive ? classes.active : classes.nav
						}
					>
						<p className={classes.cartnumber}>{cartNumber}</p>
						<div className={classes.flexIcon}>
							<FontAwesomeIcon icon={faCartFlatbed} className={classes.icon} />
							<p>Cart</p>
						</div>
					</NavLink>
				</div>
				<div className={classloginUser}>
					{user ? (
						<>
							<div className={classes.flexIcon}>
								<FontAwesomeIcon icon={faUser} className={classes.icon} />
								<p className={classes.userName}>{user.userName}</p>
								<FontAwesomeIcon
									icon={faSortDown}
									className={classes.iconDown}
								/>
								<NavLink
									to='sign-in'
									className={({ isActive }) =>
										isActive ? classes.active : classes.nav
									}
								>
									<p className={classes.textLogout} onClick={handlerLogout}>
										Logout
									</p>
								</NavLink>
							</div>
						</>
					) : (
						<>
							<NavLink
								to='/sign-in'
								className={({ isActive }) =>
									isActive ? classes.active : classes.nav
								}
							>
								<div className={classes.flexIcon}>
									<FontAwesomeIcon icon={faUser} className={classes.icon} />
									<p>Login</p>
								</div>
							</NavLink>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Navbar);
