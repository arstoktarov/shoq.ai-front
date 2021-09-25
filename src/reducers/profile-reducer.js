import {actionTypes} from "../constants";

const initialState = {
    user: {},
    loading: true,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                user: action.payload,
            };
        case actionTypes.PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload.message,
            };
        default:
            return state;
    }
}