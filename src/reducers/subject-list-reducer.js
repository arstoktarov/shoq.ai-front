import {actionTypes} from "../constants";

const initialState = {
    list: [],
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SUBJECTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SUBJECTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SUBJECTS_FAILURE:
            return {
                ...state,
                list: [],
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}