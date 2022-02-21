import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const loadBaige = () => {
    return async (dispatch) => {
        dispatch(baigeRequest());
        try {
            const { data } = await apiService.getBaigeData();
            dispatch(baigeSuccess(data));
        }
        catch (e) {
            dispatch(baigeFailure(e));
            console.error(e);
        }
    }
}

export const baigeRequest = () => {
    return {
        type: actionTypes.BAIGE_REQUEST,
    }
}

export const baigeSuccess = (payload) => {
    return {
        type: actionTypes.BAIGE_SUCCESS,
        payload,
    }
}

export const baigeFailure = (payload) => {
    return {
        type: actionTypes.BAIGE_FAILURE,
        payload,
    }
}