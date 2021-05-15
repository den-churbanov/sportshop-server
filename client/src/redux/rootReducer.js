import {combineReducers} from "redux";
import {catalogReducer} from "./catalogReducer";


export const rootReducer = combineReducers({
    catalog: catalogReducer,
});