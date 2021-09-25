import {actionTypes} from "../constants";

const initialState = {
    topic: {},
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOPIC_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
            }
        case actionTypes.TOPIC_SUCCESS:
            return {
                ...state,
                topic: action.payload,
                loading: false,
                error: false,
                errorMessage: "",
            }
        case actionTypes.TOPIC_FAILURE:
            return {
                ...state,
                topic: {},
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}