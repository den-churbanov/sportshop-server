import {combineReducers} from "redux";
import {brandsReducer, sectionsReducer, sportTypesReducer} from "./catalogReducer";

export const rootReducer = combineReducers({
    sections: sectionsReducer,
    brands: brandsReducer,
    sport_types: sportTypesReducer
});