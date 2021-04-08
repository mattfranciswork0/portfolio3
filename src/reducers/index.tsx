import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
export interface StoreState {
    carouselSlideIndex: number;
}
export default combineReducers<StoreState>({
    carouselSlideIndex: carouselReducer,
});
