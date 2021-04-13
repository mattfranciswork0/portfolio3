import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface LoadingStatusAction {
    type: ActionTypes.IS_LOADING;
    payload: boolean;
}
export const updateLoadingStatus = (isLoading: boolean) => async (
    dispatch: Dispatch
) => {
    dispatch<LoadingStatusAction>({
        type: ActionTypes.IS_LOADING,
        payload: isLoading,
    });
};
