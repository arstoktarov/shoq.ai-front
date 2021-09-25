import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadOOF = () => async (dispatch) => {
    dispatch(OOFRequest());
    try {
        const { data } = await apiService.me();
        dispatch(OOFSuccess(data));
    }
    catch (e) {
        dispatch(OOFFailure(e));
    }
}

export const OOFRequest = () => {
    return {
        type: actionTypes.USER_REQUEST,
    }
}

export const OOFSuccess = (payload) => {
    return {
        type: actionTypes.USER_SUCCESS,
        payload,
    }
}

export const OOFFailure = (payload) => {
    return {
        type: actionTypes.USER_FAILURE,
        payload,
    }
}