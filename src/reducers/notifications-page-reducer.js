import {actionTypes} from "../constants";

const initialState = {
    data: {
        totalPages: 1,
        currentPage: 1,
        notifications: [],
    },
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.NOTIFICATIONS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NOTIFICATIONS_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case actionTypes.NOTIFICATIONS_LIST_FAILURE:
            return {
                loading: false,
            }
        default:
            return state;
    }
}