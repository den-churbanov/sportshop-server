import {combineReducers} from "redux";
import {sectionsReducer} from "./sectionsReducer";
import {brandsReducer} from "./brandsReducer";

export const rootReducer =  combineReducers({
    sections: sectionsReducer,
    brands: brandsReducer
});