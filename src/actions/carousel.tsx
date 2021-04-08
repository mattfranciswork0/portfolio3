import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface UpdateSlideIndexAction {
    type: ActionTypes.FETCH_SLIDE_INDEX;
    payload: number;
}
export const updateSlideIndex = (slideIndex: number) => async (
    dispatch: Dispatch
) => {
    dispatch<UpdateSlideIndexAction>({
        type: ActionTypes.FETCH_SLIDE_INDEX,
        payload: slideIndex,
    });
};
