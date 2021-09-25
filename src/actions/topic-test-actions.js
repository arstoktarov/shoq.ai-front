import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const finishTest = ({ topicId, correctCount }) => {
    return async (dispatch) => {
        await apiService.addTestResult(topicId, correctCount);
        const { data } = await apiService.getTopic(topicId);
        dispatch(topicTestDone(data.history.testWrapper));
    }
}

export const questionAnswered = (payload) => {
    return {
        type: actionTypes.QUESTION_ANSWERED,
        payload,
    }
}

export const currentQuestionIdChanged = (payload) => {
    return {
        type: actionTypes.CURRENT_QUESTION_CHANGED,
        payload,
    }
}

export const topicTestDone = (payload) => {
    return {
        type: actionTypes.TOPIC_TEST_DONE,
        payload,
    }
}

export const topicTestRetry = (payload) => {
    return {
        type: actionTypes.TOPIC_TEST_RETRY,
        payload,
    }
}