import {applyMiddleware, combineReducers, createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {sectionsSlice} from './sectionsSlice'

const rootReducer = combineReducers(sectionsSlice)

export default configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development'
});