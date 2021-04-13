import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
import headerReducer from "./headerReducer";
import loadingReducer from "./loadingReducer";
export interface StoreState {
    carouselSlideIndex: number;
    changeHeaderBackIconToBlack: boolean;
    loadingStatus: boolean;
}
export default combineReducers<StoreState>({
    carouselSlideIndex: carouselReducer,
    changeHeaderBackIconToBlack: headerReducer,
    loadingStatus: loadingReducer,
});
