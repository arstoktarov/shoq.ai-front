import {actionTypes} from "../constants";

const initialState = {
    baigeData: null,
    loading: true,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.BAIGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.BAIGE_SUCCESS:
            return {
                ...state,
                baigeData: action.payload,
                loading: false,
                error: false,
            }
        case actionTypes.BAIGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state;
    }
}