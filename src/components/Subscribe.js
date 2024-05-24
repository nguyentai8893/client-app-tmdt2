import React from 'react';
import classNames from 'classnames/bind';
import styles from './Subscribe.module.scss';

const cx = classNames.bind(styles);

const Subscribe = () => {
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('text')}>
					<div className={cx('text-content')}>
						<p className={cx('content')}>FREE SHIPING</p>
						<p className={cx('sub-text')}>Free shiping worrlwide</p>
					</div>
					<div className={cx('text-content')}>
						<p className={cx('content')}>FREE SHIPING</p>
						<p className={cx('sub-text')}>Free shiping worrlwide</p>
					</div>
					<div className={cx('text-content')}>
						<p className={cx('content')}>FREE SHIPING</p>
						<p className={cx('sub-text')}>Free shiping worrlwide</p>
					</div>
				</div>
				<div className={cx('wraper')}>
					<div>
						<p className={cx('text-title')}>LET'S BE FREIENDS!</p>
						<p className={cx('sub-title')}>
							Nisi nisi tempor consequat laboris nisi.
						</p>
					</div>
					<div className={cx('wraper-input')}>
						<input typeof='email' placeholder='Enter your email address' />
						<button>Subscribe</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Subscribe;
