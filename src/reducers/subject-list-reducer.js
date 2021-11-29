import {actionTypes} from "../constants";

const initialState = {
    list: [],
    selectives: {
        selectivesList: [],
        selectives: null,
        loading: false,
        error: false,
        errorMessage: "",
    },
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
        case actionTypes.SUBJECT_SELECTIVES_LIST_REQUEST:
            return {
                ...state,
                selectives: {
                    ...state.selectives,
                    loading: true,
                    error: false,
                    errorMessage: "",
                }
            }
        case actionTypes.SUBJECT_SELECTIVES_LIST_SUCCESS:
            return {
                ...state,
                selectives: {
                    ...state.selectives,
                    selectivesList: action.payload.selectivesList,
                    selectives: action.payload.selectives,
                    loading: false,
                    error: false,
                    errorMessage: "",
                }
            }
        case actionTypes.SUBJECT_SELECTIVES_LIST_FAILURE:
            return {
                ...state,
                selectives: {
                    ...state.selectives,
                    loading: false,
                    error: true,
                    errorMessage: action.payload,
                }
            }
        default:
            return state;
    }
}