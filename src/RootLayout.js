import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import { Provider } from 'react-redux';
import store from './store';

const RootLayout = () => {
	return (
		<>
			<Provider store={store}>
				<Navbar />
				<main>
					<Outlet />
				</main>
			</Provider>
		</>
	);
};

export default RootLayout;
