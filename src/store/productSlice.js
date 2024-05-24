import { createSlice } from '@reduxjs/toolkit';
// khai báo  initialState
const initialState = {
	currentCategory: 'All',
	products: [],
	productCart: [],
	quantity: 0,
	cartState: [],
	orderState: [],

	selectedProducts: [],
};

// tạo slice product
const productSlice = createSlice({
	name: 'product-category',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.currentCategory = action.payload;
		},
		setProduct(state, action) {
			state.products = action.payload;
			localStorage.setItem('products', JSON.stringify(action.payload));
		},
		productQuantity(state, action) {
			state.productCart = action.payload.product;
			state.quantity = action.payload.quantity;
		},
		decremenHandler(state, action) {
			const product = action.payload.product;
			console.log('accc', action.payload);
			if (product) {
				product.quantity -= 1;
				state.productCart = product;
			}
		},
		incremenHandler(state, action) {
			const product = action.payload;
			if (product) {
				product.quantity += 1;
				state.productCart = product;
			}
		},
		updateCartItemQuantity(state, action) {
			const { idProduct, quantity } = action.payload;
			const productIndex = state.cartState.findIndex(
				(item) => item.idProduct === idProduct
			);
			if (productIndex !== -1) {
				state.cartState[productIndex].quantity = quantity;
			}
		},
		removeItem(state, action) {
			state.productCart = action.payload;
		},
		cartItem(state, action) {
			localStorage.setItem('cartItems', JSON.stringify(action.payload));
			state.cartState = action.payload;
		},
		removeCartState(state, action) {
			state.cartState = [];
		},
		order(state, action) {
			state.orderState = action.payload;
			localStorage.setItem('order', JSON.stringify(action.payload));
		},
		ressetState(state) {
			state.cartState = [];
			state.orderState = [];
			state.products = [];
		},
		selectProduct(state, action) {
			const productId = action.payload;
			const index = state.selectedProducts.indexOf(productId);
			if (index === -1) {
				// Thêm id của sản phẩm vào danh sách nếu không tồn tại
				state.selectedProducts.push(productId);
			} else {
				// Loại bỏ id của sản phẩm khỏi danh sách nếu đã tồn tại
				state.selectedProducts.splice(index, 1);
			}
			// Lưu trạng thái của các sản phẩm đã chọn vào local storage
			localStorage.setItem(
				'selectedProducts',
				JSON.stringify(state.selectedProducts)
			);
		},
	},
});

export const productAction = productSlice.actions;
export default productSlice.reducer;
