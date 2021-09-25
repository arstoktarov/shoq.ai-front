import {actionTypes} from "../constants";

const initialState = {
    user: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case actionTypes.USER_FAILURE:
            return {
                loading: false,
            }
        default:
            return state;
    }
}