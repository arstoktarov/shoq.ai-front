import { actionTypes } from '../constants'
import apiService from "services/api-service";
import helpers from "../helpers";

export const loadTrialTest = () => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.trialContinue();
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const getTrialById = (trialId) => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.getTrialById(trialId);
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const trialFinish = ({ trialId, mode, questionResultData }) => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.trialFinal(trialId, mode, questionResultData);
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const trialRunning = ({ trialId, moveTo, questionResultData }) => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.trailRunning(trialId, moveTo, questionResultData);
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const trialEnded = ({ trialId, moveTo, questionResultData }) => async (dispatch) => {
    dispatch(trialTestRequest());
    try {
        const { data } = await apiService.trialEnded(trialId, moveTo, questionResultData);
        dispatch(trialTestSuccess(data));
    }
    catch (e) {
        dispatch(trialTestFailure(e));
    }
}

export const trialAnswerSelected = (payload) => ({
    type: actionTypes.TRIAL_ANSWER_SELECTED,
    payload
});

export const trialQuestionMarked = (payload) => ({
    type: actionTypes.TRIAL_QUESTION_MARKED,
    payload
});

export const trialTestRequest = (payload) => {
    return {
        type: actionTypes.TRIAL_TEST_REQUEST,
        payload,
    }
}

export const trialTestSuccess = (payload) => {
    return {
        type: actionTypes.TRIAL_TEST_SUCCESS,
        payload,
    }
}

export const trialTestFailure = (payload) => {
    return {
        type: actionTypes.TRIAL_TEST_FAILURE,
        payload,
    }
}