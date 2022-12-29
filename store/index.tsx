import { configureStore } from "@reduxjs/toolkit";


import counterSliceReducer from './counterSlice'
const store = configureStore({reducer:{counter:counterSliceReducer}})
export default store;