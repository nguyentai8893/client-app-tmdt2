import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignupPage.module.scss';
import { Link, json, useNavigate } from 'react-router-dom';

import useAxios from '../hook/useAxios';
const cx = classNames.bind(styles);

const SignupPage = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [err, setErr] = useState('');
	const [postData, setPostData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
	});
	const { loading, error, apiRequest } = useAxios();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
	});
	let newUser = {};
	const existingAccounts = JSON.parse(localStorage.getItem('userArr')) || [];

	const handelChange = (e) => {
		e.preventDefault();
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};
	console.log(postData);
	const handlerSignUP = async () => {
		try {
			const res = await apiRequest(
				'http://localhost:8000/api/register',
				'post',
				postData
			);

			if (res && res.status == true) {
				navigate('/sign-in');
			}
			if (res && res.status == false) {
				setErr(res.message);
			}
		} catch (error) {
			console.log(error);
		}

		// localStorage.setItem('userArr', JSON.stringify('user'));
		// navigate('/sign-in');
	};
	if (loading) return <div>Loading...</div>;

	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-form')}>
					<h3>Sign Up</h3>
					<div className={cx('form')}>
						<input
							onChange={handelChange}
							type='text'
							name='name'
							placeholder='Full Name'
						/>

						<br />
						<input
							onChange={handelChange}
							name='email'
							placeholder='Email'
							type='email'
						/>

						<br />
						<input
							onChange={handelChange}
							type='text'
							name='password'
							placeholder='Password'
						/>

						<br />
						<input
							onChange={handelChange}
							type='number'
							name='phone'
							placeholder='Phone'
						/>
						<br />
						{err && <span className={cx('err')}>{err}</span>}
						<button className={cx('btn')} onClick={handlerSignUP}>
							Sign Up
						</button>
						<p>
							Sign In? <Link to='/sign-in'>Click</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupPage;
