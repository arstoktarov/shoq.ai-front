import apiService from "services/api-service";
import * as actionTypes from "constantValues/action-types";
import {trialTestFailure, trialTestRequest, trialTestSuccess} from "actions/trial-test-actions";

export const loadSelectives = () => async (dispatch) => {
    dispatch(selectivesListRequest());
    try {
        const { data: selectivesList } = await apiService.getSelectives();
        const { data: { selectives } } = await apiService.me();
        dispatch(selectivesListSuccess({ selectivesList, selectives }));
    }
    catch (e) {
        dispatch(selectivesListFailure(e))
    }
}

export const getTrialPage = () => async (dispatch) => {
    dispatch(trialPageRequest());
    try {
        const { data } = await apiService.getTrialPage();
        const { data: selectivesList } = await apiService.getSelectives();
        const { data: { selectives } } = await apiService.me();
        dispatch(trialPageSuccess(data));
        dispatch(selectivesListSuccess({ selectivesList, selectives }));
    }
    catch (e) {
        dispatch(trialPageFailure(e))
    }
}

export const setSelectives = ({ selectiveId, selectivePairId }) => async (dispatch) => {
    dispatch(selectivesListRequest());
    try {
        const { data: { selectives } } = await apiService.setSelectives(selectiveId, selectivePairId);
        const { data: selectivesList } = await apiService.getSelectives();
        dispatch(selectivesListSuccess({ selectivesList, selectives }));
    }
    catch (e) {

    }
}

export const loadProfile = () => async (dispatch) => {
    dispatch(trialPageRequest());
    try {
        const { data } = await apiService.getTrialPage();
        dispatch(trialPageSuccess(data));
    }
    catch (e) {
        dispatch(trialPageFailure(e));
    }
}

export const startTrial = () => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const {data} = await apiService.startTrial();
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure());
    }
}

export const continueTrial = () => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.trialContinue();
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const trialPageRequest = () => ({
    type: actionTypes.TRIAL_PAGE_REQUEST,
});

export const trialPageSuccess = (payload) => ({
    type: actionTypes.TRIAL_PAGE_SUCCESS,
    payload,
});

export const trialPageFailure = (payload) => ({
    type: actionTypes.TRIAL_PAGE_FAILURE,
    payload,
});

export const selectivesListRequest = () => ({
    type: actionTypes.SELECTIVES_LIST_REQUEST,
});

export const selectivesListSuccess = (payload) => ({
    type: actionTypes.SELECTIVES_LIST_SUCCESS,
    payload,
});

export const selectivesListFailure = (payload) => ({
    type: actionTypes.SELECTIVES_LIST_FAILURE,
    payload,
});