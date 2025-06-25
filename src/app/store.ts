
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import cartReducer from "../features/cart/cartSlice"; 

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
