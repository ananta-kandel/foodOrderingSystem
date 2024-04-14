import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice';
import CategorySlice from './slices/CategorySlice';
const store = configureStore({
  reducer: {
    cart : CartSlice,
    Category : CategorySlice
  },
})

export default store;
