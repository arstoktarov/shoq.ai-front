import {actionTypes} from "../constants";

const initialState = {
    history: null,
    trialPage: {
        history: [],
    },
    selectivesList: [],
    selectives: null,
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SELECTIVES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SELECTIVES_LIST_SUCCESS:
            return {
                ...state,
                selectivesList: action.payload.selectivesList,
                selectives: action.payload.selectives,
                loading: false,
                error: false,
                errorMessage: "",
            }
        case actionTypes.SELECTIVES_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        case actionTypes.TRIAL_PAGE_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
            }
        }
        case actionTypes.TRIAL_PAGE_SUCCESS:
            return {
                ...state,
                trialPage: action.payload,
                loading: false,
                error: false,
                errorMessage: "",
            }
        case actionTypes.TRIAL_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}