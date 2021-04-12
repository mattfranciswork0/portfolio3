import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
import headerReducer from "./headerReducer";
export interface StoreState {
    carouselSlideIndex: number;
    changeHeaderBackIconToBlack: boolean;
}
export default combineReducers<StoreState>({
    carouselSlideIndex: carouselReducer,
    changeHeaderBackIconToBlack: headerReducer,
});
