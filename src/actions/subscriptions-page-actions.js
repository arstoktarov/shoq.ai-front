import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadSubscriptions = () => async (dispatch) => {
    dispatch(subscriptionsRequest());
    try {
        const { data } = await apiService.getPriceList();
        dispatch(subscriptionsSuccess(data));
    }
    catch (e) {
        dispatch(subscriptionsFailure(e));
    }
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