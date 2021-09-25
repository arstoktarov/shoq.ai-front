import {actionTypes} from "../constants";

const initialState = {
    subscriptions: [],
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SUBSCRIPTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
            }
        case actionTypes.SUBSCRIPTIONS_FAILURE:
            return {
                loading: false,
                subscriptions: action.payload,
            }
        default:
            return state;
    }
}