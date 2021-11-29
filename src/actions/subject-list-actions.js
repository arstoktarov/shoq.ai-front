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

export const loadSubjectSelectives = () => async (dispatch) => {
    dispatch(subjectSelectivesListRequest());
    try {
        const { data: selectivesList } = await apiService.getSubjectSelectives();
        const { data: { courseSelectives } } = await apiService.me();
        dispatch(subjectSelectivesListSuccess({ selectivesList, selectives: courseSelectives }));
    }
    catch (e) {
        dispatch(subjectSelectivesListFailure(e));
    }
}

export const setSubjectSelectives = ({ selectiveId, selectivePairId }) => async (dispatch) => {
    dispatch(subjectSelectivesListRequest());
    try {
        const { data: { courseSelectives } } = await apiService.setSubjectSelectives(selectiveId, selectivePairId);
        const { data: selectivesList } = await apiService.getSubjectSelectives();
        dispatch(subjectSelectivesListSuccess({ selectivesList, selectives: courseSelectives }));
    }
    catch (e) {

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

export const subjectSelectivesListRequest = () => ({
    type: actionTypes.SUBJECT_SELECTIVES_LIST_REQUEST,
});

export const subjectSelectivesListSuccess = (payload) => ({
    type: actionTypes.SUBJECT_SELECTIVES_LIST_SUCCESS,
    payload,
});

export const subjectSelectivesListFailure = (payload) => ({
    type: actionTypes.SUBJECT_SELECTIVES_LIST_FAILURE,
    payload,
});