import { createSlice } from '@reduxjs/toolkit';

const showHideState = {
	isShowPopup: false,
	selectProduct: {},
	isShowForm: false,
};

const popupSlice = createSlice({
	name: 'popup',
	initialState: showHideState,
	reducers: {
		showPopup(state, action) {
			state.isShowPopup = true;
			state.selectProduct = action.payload;
		},
		closeModal(state) {
			state.isShowPopup = false;
		},
		showFormMess(state) {
			state.isShowForm = !state.isShowForm;
		},
	},
});
export const popupAction = popupSlice.actions;
export default popupSlice.reducer;
