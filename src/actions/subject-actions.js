import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const loadSubject = (subjectId) => {
    return async (dispatch) => {
        dispatch(subjectRequest());

        try {
            const { data } = await apiService.getSubject(subjectId);

            console.log("This one:", data);

            const { isBought, freeTopics, completedTopics, sections, currentState: { topic: activeTopic } } = data;
            console.log(activeTopic);

            const subject = {
                ...data,
                sections: data.sections.map((section) => {
                    return {
                        ...section,
                        topics: section.topics.map((topic) => {
                            return {
                                ...topic,
                                active: topic.id === (activeTopic === 0 ? sections[0]?.topics[0]?.id ?? 0 : activeTopic),
                                completed: completedTopics.includes(topic.id),
                                available: (isBought || freeTopics.includes(topic.id)),
                            }
                        })
                    }
                }),
            };

            console.log("Changed to: ", subject);

            dispatch(subjectSuccess(subject));
        }
        catch (e) {
            subjectFailure(e);
            console.error(e);
        }

    }
}

export const subjectRequest = () => {
    return {
        type: actionTypes.SUBJECT_REQUEST,
    }
}

export const subjectSuccess = (payload) => {
    return {
        type: actionTypes.SUBJECT_SUCCESS,
        payload,
    }
}

export const subjectFailure = (payload) => {
    return {
        type: actionTypes.SUBJECT_FAILURE,
        payload,
    }
}