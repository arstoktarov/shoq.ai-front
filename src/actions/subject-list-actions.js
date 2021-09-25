import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const loadSubjects = () => {
    return async (dispatch) => {
        dispatch(subjectsRequest());

        try {
            const { data } = await apiService.getSubjects();
            dispatch(subjectsSuccess(data));

        }
        catch (e) {
            console.error(e);
        }

    }
}

export const subjectsRequest = () => {
    return {
        type: actionTypes.SUBJECTS_REQUEST,
    }
}

export const subjectsSuccess = (payload) => {
    return {
        type: actionTypes.SUBJECTS_SUCCESS,
        payload,
    }
}

export const subjectsFailure = (payload) => {
    return {
        type: actionTypes.SUBJECTS_FAILURE,
        payload,
    }
}