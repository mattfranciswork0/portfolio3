import { ActionTypes, FetchSlideIndexAction } from "../actions";

const carouselReducer = (state: number = 0, action: FetchSlideIndexAction) => {
    switch (action.type) {
        case ActionTypes.FETCH_SLIDE_INDEX:
            return action.payload;

        default:
            return state;
    }
};

export default carouselReducer;
