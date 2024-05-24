import React from 'react';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';

const Product = () => {
	return (
		<div className={classes.container}>
			<div className={classes.category}>
				<p>CAREFULLY CREATED COLLECTIONS</p>
				<h3>BROWSE OUR CATEGORYES</h3>
			</div>
			<div className={classes.containerGrid}>
				<Link to='shop' className={classes.topLeft}>
					<img src='/assets/images/product_1.png' alt='image product' />
				</Link>
				<Link to='shop' className={classes.topRight}>
					<img src='/assets/images/product_2.png' alt='image product' />
				</Link>
				<Link to='shop' className={classes.content1}>
					<img src='/assets/images/product_3.png' alt='image product' />
				</Link>
				<Link to='shop' className={classes.content2}>
					<img src='/assets/images/product_4.png' alt='image product' />
				</Link>
				<Link to='shop' className={classes.content3}>
					<img src='/assets/images/product_5.png' alt='image product' />
				</Link>
			</div>
		</div>
	);
};

export default Product;
