import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../store/showHideSlice';
import productReducer from '../store/productSlice';
import loginUserSlice from './loginUserSlice';

const store = configureStore({
	reducer: {
		popup: popupReducer,
		product: productReducer,
		auth: loginUserSlice,
	},
});

export default store;
