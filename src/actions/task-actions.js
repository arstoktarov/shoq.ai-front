import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const replyTask = ({ topicId, replyTo, message, image }) => {
    return async (dispatch) => {
        const { data } = await apiService.addMessage(topicId, replyTo, message, image);
        console.log(data);
        dispatch(taskReplied(data));
    }
}

export const taskReplied = (payload) => {
    return {
        type: actionTypes.TASK_REPLIED,
        payload,
    }
}