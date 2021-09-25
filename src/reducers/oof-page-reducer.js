import {actionTypes} from "../constants";

const initialState = {
    oof: null,
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.OOF_REQUEST:
            return {
                ...state,
                error: false,
                loading: true,
            }
        case actionTypes.OOF_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            };
        case actionTypes.OOF_FAILURE:
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