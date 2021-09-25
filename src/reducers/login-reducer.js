import {actionTypes} from "../constants";

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                error: false,
                loading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: action.payload,
            }
        case actionTypes.LOGIN_LOGOUT:
            return {
                ...state,
            };
        default:
            return state;
    }
}