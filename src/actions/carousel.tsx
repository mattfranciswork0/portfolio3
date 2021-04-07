import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface FetchSlideIndexAction {
    type: ActionTypes.FETCH_SLIDE_INDEX;
    payload: number;
}
export const fetchSlideIndex = (slideIndex: number) => async (
    dispatch: Dispatch
) => {
    dispatch<FetchSlideIndexAction>({
        type: ActionTypes.FETCH_SLIDE_INDEX,
        payload: slideIndex,
    });
};
