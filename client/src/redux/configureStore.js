import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {rootReducer} from "./rootReducer"

export default configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()], //reduxLogger
    devTools: process.env.NODE_ENV === 'development',
});