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
        console.log(e);
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

export const supportAvailableRefreshAction = (userId) => async (dispatch) => {
    try {
        const { data } = await apiService.supportAvailableRefresh(userId);
        dispatch(supportAvailableRefresh(data));
    }
    catch (e) {
        console.error(e);
    }
}

export const supportWrite = ({ studentId, name, content, number }) => async (dispatch) => {
    dispatch(supportWriteRequest());
    try {
        const { data } = await apiService.supportWrite({ studentId, name, content, number });
        await supportAvailableRefreshAction(studentId)(dispatch);
        dispatch(supportWriteSuccess(data));
    }
    catch (e) {
        console.error("supportWrite", e);
        dispatch(supportWriteFailure());
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

export const selectiveChanged = (payload) => ({
    type: actionTypes.SELECTIVE_CHANGED,
    payload,
})

export const selectivePairChanged = (payload) => ({
    type: actionTypes.SELECTIVE_PAIR_CHANGED,
    payload,
});

export const supportAvailableRefresh = (payload) => ({
    type: actionTypes.SUPPORT_AVAILABLE_REFRESH,
    payload,
});

export const supportWriteRequest = () => ({
    type: actionTypes.SUPPORT_WRITE_REQUEST,
});

export const supportWriteSuccess = () => ({
    type: actionTypes.SUPPORT_WRITE_SUCCESS,
});

export const supportWriteFailure = () => ({
    type: actionTypes.SUPPORT_WRITE_FAILURE
});

