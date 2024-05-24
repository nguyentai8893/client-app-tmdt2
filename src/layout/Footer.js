import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
const Footer = () => {
	return (
		<>
			<div className={cx('container')}>
				<div className={cx('container-item')}>
					<div>
						<h4>CUSTOMER SERVICER </h4>
						<ul>
							<li>Help & Contact Us</li>
							<li>Return & Refunds</li>
							<li>Online Stores</li>
							<li>Tems & Conditons</li>
						</ul>
					</div>

					<div>
						<h4>COMPANY </h4>
						<ul>
							<li>What We Do</li>
							<li>Available Services</li>
							<li>Latest Post</li>
							<li>FAQs</li>
						</ul>
					</div>
					<div>
						<h4>SOCIAL MEDIA</h4>
						<ul>
							<li>Twiter</li>
							<li>Instagram</li>
							<li>Facebook</li>
							<li>Pinterest</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
