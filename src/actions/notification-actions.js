import apiService from "services/api-service";
import {actionTypes} from "../constants";

export const loadNotifications = (page) => async (dispatch) => {
    dispatch(notificationsListRequest());
    try {
        const { data } = await apiService.getNotifications(page);
        console.log(data);
        dispatch(notificationsListSuccess(data));
    }
    catch (e) {
        console.error(e);
        dispatch(notificationsListFailure(e));
    }
}

export const notificationsListRequest = () => ({
    type: actionTypes.NOTIFICATIONS_LIST_REQUEST,
});

export const notificationsListSuccess = (payload) => ({
    type: actionTypes.NOTIFICATIONS_LIST_SUCCESS,
    payload
});

export const notificationsListFailure = (payload) => ({
    type: actionTypes.NOTIFICATIONS_LIST_FAILURE,
    payload,
});

