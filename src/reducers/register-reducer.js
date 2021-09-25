import {actionTypes} from "../constants";

const initialState = {
    loading: false,
    error: false,
    errorMessage: "Не удалось авторизоваться.",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
            }
        case actionTypes.LOGIN_LOGOUT:
            return {
                ...state,
            };
        default:
            return state;
    }
}