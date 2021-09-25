import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadUser = () => async (dispatch) => {
    dispatch(userRequest());
    try {
        const { data } = await apiService.me();
        dispatch(userSuccess(data));
    }
    catch (e) {
        dispatch(userFailure(e));
    }
}

export const userRequest = () => {
    return {
        type: actionTypes.USER_REQUEST,
    }
}

export const userSuccess = (payload) => {
    return {
        type: actionTypes.USER_SUCCESS,
        payload,
    }
}

export const userFailure = (payload) => {
    return {
        type: actionTypes.USER_FAILURE,
        payload,
    }
}