import React from 'react';
import classes from './Banner.module.css';
import { Link } from 'react-router-dom';
const Banner = () => {
	return (
		<div className={classes.banner}>
			<img src='/assets/images/banner1.jpg' alt='image' />
			<div className={classes.container}>
				<p className={classes.inspiration}>NEW INSPIRATION 2020</p>
				<p className={classes.title}>20% OFF ON NEW SEASON </p>
				<Link to='shop'>
					<button className={classes.btn}>Browse Collections</button>
				</Link>
			</div>
		</div>
	);
};

export default Banner;
