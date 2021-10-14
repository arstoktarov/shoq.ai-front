import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadSubscriptions = () => async (dispatch) => {
    dispatch(subscriptionsRequest());
    try {
        const { data: priceList } = await apiService.getPriceList();
        const { data: selectives } = await apiService.getSelectivesUnauthed();
        dispatch(subscriptionsSuccess({ priceList, selectives }));
    }
    catch (e) {
        dispatch(subscriptionsFailure(e));
    }
}

export const loadSelectives = () => async (dispatch) => {
    dispatch(subscriptionsRequest());
    try {
        dispatch(subscriptionsSuccess(data));
    }
    catch (e) {
        dispatch(subscriptionsFailure(e));
    }
}

export const setSelectives = () => async (dispatch) => {

}

export const subscriptionsRequest = () => ({
    type: actionTypes.SUBSCRIPTIONS_REQUEST,
});

export const subscriptionsSuccess = payload => ({
    type: actionTypes.SUBSCRIPTIONS_SUCCESS,
    payload,
});

export const subscriptionsFailure = payload => ({
    type: actionTypes.SUBSCRIPTIONS_FAILURE,
    payload,
});

export const selectiveChanged = (payload) => ({
    type: actionTypes.SELECTIVE_CHANGED,
    payload,
})

export const selectivePairChanged = (payload) => ({
    type: actionTypes.SELECTIVE_PAIR_CHANGED,
    payload,
});