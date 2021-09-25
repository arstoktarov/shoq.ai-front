import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const loadTopic = (topicId) => {
    return async (dispatch) => {
        dispatch(topicRequest());

        try {
            const { data } = await apiService.getTopic(topicId);

            dispatch(topicSuccess(data));
        }
        catch (e) {
            topicFailure(e);
            console.error(e);
        }

    }
}

export const topicRequest = () => {
    return {
        type: actionTypes.TOPIC_REQUEST,
    }
}

export const topicSuccess = (payload) => {
    return {
        type: actionTypes.TOPIC_SUCCESS,
        payload,
    }
}

export const topicFailure = (payload) => {
    return {
        type: actionTypes.TOPIC_FAILURE,
        payload,
    }
}