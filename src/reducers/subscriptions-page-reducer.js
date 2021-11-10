import {actionTypes} from "../constants";

const initialState = {
    subscriptions: [],
    selectives: [],
    selectiveId: null,
    selectivePairId: null,
    supportAvailable: {
        isAvailable: true,
        leftSeconds: 0,
    },
    supportWrite: {
        success: false,
        loading: false,
        error: false,
    },
    kaspiAvailable: {
        isAvailable: true,
        leftSeconds: 0,
    },
    kaspiWrite: {
        success: false,
        loading: false,
        error: false,
    },
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
        case actionTypes.SUPPORT_AVAILABLE_REFRESH:
        {
            const {isAvailable = true, leftSeconds = 0} = action.payload;
            return {
                ...state,
                supportAvailable: {
                    isAvailable,
                    leftSeconds
                },
            };
        }
        case actionTypes.SUPPORT_WRITE_REQUEST:
        {
            return {
                ...state,
                supportWrite: {
                    success: false,
                    loading: true,
                    error: false,
                },
            }
        }
        case actionTypes.SUPPORT_WRITE_SUCCESS:
        {
            return {
                ...state,
                supportWrite: {
                    success: true,
                    loading: false,
                    error: false,
                }
            }
        }
        case actionTypes.KASPI_AVAILABLE_REFRESH:
        {
            const {isAvailable = true, leftSeconds = 0} = action.payload;
            return {
                ...state,
                kaspiAvailable: {
                    isAvailable,
                    leftSeconds
                },
            };
        }
        case actionTypes.KASPI_WRITE_REQUEST:
        {
            return {
                ...state,
                kaspiWrite: {
                    success: false,
                    loading: true,
                    error: false,
                },
            }
        }
        case actionTypes.KASPI_WRITE_SUCCESS:
        {
            return {
                ...state,
                kaspiWrite: {
                    success: true,
                    loading: false,
                    error: false,
                }
            }
        }
        default:
            return state;

    }
}