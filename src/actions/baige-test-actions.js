import { actionTypes } from '../constants'
import apiService from "services/api-service";
import helpers from "../helpers";

export const startBaige = () => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.startBaige();
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const loadBaigeTest = () => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.startBaige();
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const getBaigeById = (baigeId) => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.getBaigeById(baigeId);
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const baigeFinish = ({ baigeId, mode, questionResultData }) => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.baigeFinal(baigeId, mode, questionResultData);
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const baigeRunning = ({ baigeId, moveTo, questionResultData }) => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.baigeRunning(baigeId, moveTo, questionResultData);
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const baigeEnded = ({ baigeId, moveTo, questionResultData }) => async (dispatch) => {
    dispatch(baigeTestRequest());
    try {
        const { data } = await apiService.baigeEnded(baigeId, moveTo, questionResultData);
        dispatch(baigeTestSuccess(data));
    }
    catch (e) {
        dispatch(baigeTestFailure(e));
    }
}

export const baigeAnswerSelected = (payload) => ({
    type: actionTypes.BAIGE_ANSWER_SELECTED,
    payload
});

export const baigeQuestionMarked = (payload) => ({
    type: actionTypes.BAIGE_QUESTION_MARKED,
    payload
});

export const baigeTestRequest = (payload) => {
    return {
        type: actionTypes.BAIGE_TEST_REQUEST,
        payload,
    }
}

export const baigeTestSuccess = (payload) => {
    return {
        type: actionTypes.BAIGE_TEST_SUCCESS,
        payload,
    }
}

export const baigeTestFailure = (payload) => {
    return {
        type: actionTypes.BAIGE_TEST_FAILURE,
        payload,
    }
}

// export const baigeStartRequest = (payload) => {
//     return {
//         type: actionTypes.BAIGE_START_REQUEST,
//         payload,
//     }
// }

// export const baigeStartSuccess = (payload) => {
//     return {
//         type: actionTypes.BAIGE_START_SUCCESS,
//         payload,
//     }
// }

// export const baigeStartFailure = (payload) => {
//     return {
//         type: actionTypes.BAIGE_START_FAILURE,
//         payload,
//     }
// }