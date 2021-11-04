import {actionTypes} from "../constants";

const initialState = {
    verificationId: null,
    recoveryId: null,
    recoveryVerificationId: null,
    loading: true,
    error: false,
    isAuthenticated: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: false,
                loading: false,
            };
        case actionTypes.AUTH_FAILURE:
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: true,
                errorMessage: action.payload?.errorMessage ?? "",
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case actionTypes.LOGIN_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            };
        case actionTypes.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                verificationId: action.payload,
                loading: true,
                error: false,
            };
        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            };
        case actionTypes.RECOVERY_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.RECOVERY_SUCCESS:
            return {
                ...state,
                recoveryId: action.payload,
                loading: false,
                error: false,
            };
        case actionTypes.RECOVERY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case actionTypes.RECOVERY_VERIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case actionTypes.RECOVERY_VERIFICATION_SUCCESS:
            return {
                ...state,
                recoveryVerificationId: action.payload,
                loading: false,
                error: false,
            }
        case actionTypes.RECOVERY_VERIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state;
    }
}