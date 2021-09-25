import {actionTypes} from "../constants";

const initialState = {
    messageStudent: [],
    messageModerator: [],
    tasks: [],
    answeredTaskIds: [],
    loading: false,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOPIC_SUCCESS: {
            const {conversation} = action.payload;
            if (!conversation) {
                const {tasks} = action.payload;
                return {
                    ...state,
                    tasks,
                    loading: false,
                    error: false,
                    errorMessage: "",
                }
            } else {
                const {tasks, messageStudent, messageModerator, answeredTaskIds} = conversation;
                return {
                    ...state,
                    tasks,
                    messageModerator,
                    messageStudent,
                    answeredTaskIds,
                    loading: false,
                    error: false,
                    errorMessage: "",
                }
            }
        }
        case actionTypes.TASK_REPLIED: {
            const {tasks, messageStudent, messageModerator, answeredTaskIds} = action.payload;
            console.log(action.payload);
            return {
                ...state,
                tasks,
                messageModerator,
                messageStudent,
                answeredTaskIds,
                loading: false,
                error: false,
                errorMessage: "",
            }
        }
        default:
            return state;
    }
}