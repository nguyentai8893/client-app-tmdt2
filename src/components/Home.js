import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Product from './Product';
import ListProduct from './ListProduct';
import Subscribe from './Subscribe';
import Footer from '../layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFaceSmile,
	faPaperPlane,
	faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { popupAction } from '../store/showHideSlice';
import Modal from '../Modal';
import useAxios from '../hook/useAxios';
import { productAction } from '../store/productSlice';
import io from 'socket.io-client';

const cx = classNames.bind(styles);
const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);
export const Home = () => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState([]);
	const [messages, setMessages] = useState([]);
	const [roomId, setRoomId] = useState(localStorage.getItem('roomId') || null);
	const user = JSON.parse(localStorage.getItem('user')) || [];
	const isShowFormMess = useSelector((state) => state.popup.isShowForm);
	useEffect(() => {
		setRoomId(user._id);
		socket.on('roomCreated', (roomId) => {
			localStorage.setItem('roomId', roomId);
		});
		socket.emit('joinRoom', roomId);
		socket.on('loadMessages', (loadedMessages) => {
			setMessages(loadedMessages);
		});

		socket.on('receiveMessage', ({ newMessage }) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			socket.off('receiveMessage');
			socket.off('loadMessages');
		};
	}, [roomId]);

	const sendMessage = () => {
		if (!message.trim()) {
			return;
		}
		if (message === '/end') {
			dispatch(popupAction.showFormMess());
			setMessages([]);
		}
		const newMessage = {
			sender: user.userName,
			content: message,
		};
		socket.emit('createRoom', { roomId: user._id });
		socket.emit('sendMessage', { roomId: user._id, newMessage });
		setMessage('');
	};

	const handleKeyUp = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	const handlerShowForm = () => {
		dispatch(popupAction.showFormMess());
	};

	const { apiRequest } = useAxios();
	const isLogin = useSelector((state) => state.auth.isLogin);
	useEffect(() => {
		if (isLogin) {
			const fetchProduct = async () => {
				try {
					const res = await apiRequest(`${apiUrl}/api/products`, 'get');

					if (res.status === 200) {
						dispatch(productAction.setProduct(res.products));
					}
				} catch (err) {
					console.log(err);
				}
			};
			const getCart = async () => {
				try {
					const res = await apiRequest(
						`${apiUrl}/api/get-cart?userId=${user._id}`,
						'get'
					);

					if (res.status === 200) {
						dispatch(productAction.cartItem(res.cartItems));
					}
				} catch (error) {
					throw new Error(error);
				}
			};

			const getOrder = async () => {
				try {
					const res = await apiRequest(
						`${apiUrl}/api/get-order?userId=${user._id}`,
						'get'
					);
					if (res.status === 200) {
						dispatch(productAction.order(res.order));
					}
				} catch (error) {}
			};
			fetchProduct();
			getCart();
			getOrder();
		}
	}, [isLogin]);

	return (
		<>
			<div className={cx('container')}>
				<Banner />
				<Product />
				<ListProduct />
				<Subscribe />
				<Footer />
				{isShowFormMess && (
					// <ClientChat />
					<Modal isShowMess={isShowFormMess}>
						<div className={cx('modal-content')}>
							<div className={cx('title-modal')}>
								<h6>Customer Support</h6>
								<button>Les't Chat App</button>
							</div>
							<div className={cx('content')}>
								<div className={cx('text-admin')}>
									{messages?.map((msg, index) => (
										<div
											key={index}
											className={cx('message', {
												'user-message': msg.sender === user.userName,
												'admin-message': msg.sender !== user.userName,
											})}
										>
											<p
												className={cx(
													msg.sender === user.userName ? 'user' : 'admin'
												)}
											>
												<img
													src={
														msg.sender !== user.userName
															? '/assets/images/image.png'
															: '/assets/images/42394608_2179729705686535_2045392550251986944_n (1).jpg'
													}
													alt='Avatar'
												/>
												<strong>
													{msg.sender === 'tuvanvien' ? msg.sender : 'You'}:
												</strong>{' '}
												{msg.content}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className={cx('content-footer')}>
								<div className={cx('avatar')}>
									<img
										src='/assets/images/42394608_2179729705686535_2045392550251986944_n (1).jpg'
										alt='image'
									/>
								</div>

								<input
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									placeholder='Enter Message!'
									className={cx('auto-line-break')}
									onKeyDown={handleKeyUp}
								/>
								<div className={cx('footer-icon')}>
									<FontAwesomeIcon className={cx('icon')} icon={faPaperclip} />
									<FontAwesomeIcon className={cx('icon')} icon={faFaceSmile} />

									<FontAwesomeIcon
										onClick={sendMessage}
										className={cx('icon')}
										icon={faPaperPlane}
									/>
								</div>
							</div>
						</div>
					</Modal>
				)}
				<div onClick={handlerShowForm} className={cx('message')}>
					<img
						className={cx(`${isShowFormMess ? 'active' : 'img'}`)}
						src='/assets/images/tải xuống.png'
						alt='image'
					/>
				</div>
			</div>
		</>
	);
};
