import React, { useEffect, useState } from 'react';
import styles from './ClientChat.module.scss';
import classNames from 'classnames/bind';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

const cx = classNames.bind(styles);

const ClientChat = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		socket.on('receiveMessage', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off('receiveMessage');
		};
	}, []);

	const sendMessage = () => {
		socket.emit('sendMessage', { message });
		setMessage('');
	};

	return (
		<div className={cx('chat-container')}>
			<input
				type='text'
				placeholder='Enter room name'
				className={cx('room-input')}
			/>
			<div className={cx('chat-messages')}>
				{messages.map((msg, index) => (
					<div key={index} className={cx('message')}>
						<strong>{msg.sender}:</strong> {msg}
					</div>
				))}
			</div>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className={cx('message-input')}
			/>
			<button onClick={sendMessage} className={cx('send-button')}>
				Send
			</button>
		</div>
	);
};

export default ClientChat;
