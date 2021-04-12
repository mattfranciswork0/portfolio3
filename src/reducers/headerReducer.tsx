import { ActionTypes, UpdateHeaderBackIConToBlackAction } from "../actions";

const headerReducer = (
    state: boolean = false,
    action: UpdateHeaderBackIConToBlackAction
) => {
    switch (action.type) {
        case ActionTypes.CHANGE_HEADER_BACK_ICON_TO_BLACK:
            return action.payload;

        default:
            return state;
    }
};

export default headerReducer;
