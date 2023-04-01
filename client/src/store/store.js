import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
import cartDataSlice from "./cartDataSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        modal: modalReducer,
        cartData:cartDataSlice,
        user: userReducer
    }
});

export default store;