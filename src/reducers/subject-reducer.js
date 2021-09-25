import {actionTypes} from "../constants";

const initialState = {
    subject: {},
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SUBJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SUBJECT_SUCCESS:
            return {
                ...state,
                subject: action.payload,
                loading: false,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SUBJECT_FAILURE:
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