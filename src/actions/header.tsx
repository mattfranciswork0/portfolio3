import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface UpdateHeaderBackIConToBlackAction {
    type: ActionTypes.CHANGE_HEADER_BACK_ICON_TO_BLACK;
    payload: boolean;
}
export const updateHeaderBackIconToBlack = (setColorToBlack: boolean) => async (
    dispatch: Dispatch
) => {
    dispatch<UpdateHeaderBackIConToBlackAction>({
        type: ActionTypes.CHANGE_HEADER_BACK_ICON_TO_BLACK,
        payload: setColorToBlack,
    });
};
