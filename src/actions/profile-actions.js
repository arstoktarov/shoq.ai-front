import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadProfile = () => async (dispatch) => {
    dispatch(profileRequest());
    try {
        const { data } = await apiService.me();
        dispatch(profileSuccess(data));
    }
    catch (e) {
        dispatch(profileFailure(e));
    }
}

export const editProfile = (payload) => async (dispatch) => {
    dispatch(profileRequest());
    try {
        await apiService.editProfile(payload);
        const { data } = await apiService.me();
        dispatch(profileSuccess(data));
    }
    catch (e) {
        console.error(e);
        dispatch(profileFailure(e));
    }
}

export const profileRequest = () => {
    return {
        type: actionTypes.PROFILE_REQUEST,
    }
}

export const profileSuccess = (payload) => {
    return {
        type: actionTypes.PROFILE_SUCCESS,
        payload,
    }
}

export const profileFailure = (payload) => {
    return {
        type: actionTypes.PROFILE_FAILURE,
        payload,
    }
}