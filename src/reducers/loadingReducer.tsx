import { ActionTypes, LoadingStatusAction } from "../actions";

const loadingReducer = (state: boolean = true, action: LoadingStatusAction) => {
    switch (action.type) {
        case ActionTypes.IS_LOADING:
            return action.payload;

        default:
            return state;
    }
};

export default loadingReducer;
