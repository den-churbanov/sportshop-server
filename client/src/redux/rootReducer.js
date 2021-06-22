import {combineReducers} from "redux"
import {catalogReducer} from "./catalogReducer"
import {userReducer} from "./userReducer"
import {basketReducer} from "./basketReducer"

export const rootReducer = combineReducers({
    catalog: catalogReducer,
    user: userReducer,
    basket: basketReducer
});