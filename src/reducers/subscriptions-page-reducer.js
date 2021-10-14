import {actionTypes} from "../constants";

const initialState = {
    subscriptions: [],
    selectives: [],
    selectiveId: null,
    selectivePairId: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SUBSCRIPTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUBSCRIPTIONS_SUCCESS:
        {
            const { priceList, selectives } = action.payload;
            return {
                ...state,
                subscriptions: priceList,
                selectives,
                loading: false,
            };
        }
        case actionTypes.SUBSCRIPTIONS_FAILURE:
            return {
                loading: false,
                subscriptions: action.payload,
            };
        case actionTypes.SELECTIVE_CHANGED:
            return {
                ...state,
                selectiveId: action.payload,
            };
        case actionTypes.SELECTIVE_PAIR_CHANGED:
            return {
                ...state,
                selectivePairId: action.payload,
            };
        default:
            return state;
    }
}