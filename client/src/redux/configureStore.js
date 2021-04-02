import {applyMiddleware, combineReducers, createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {sectionsSlice} from './sectionsSlice'
import logger from 'redux-logger'
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        sections: sectionsSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: applyMiddleware(logger, thunk)
});