import { combineReducers } from "redux";
import carouselReducer from "./carouselReducer";
export interface StoreState {
    carousel: number;
}
export default combineReducers<StoreState>({
    carousel: carouselReducer,
});
