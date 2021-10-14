import {actionTypes} from "../constants";

const initialState = {
    currentQuestionId: 0,
    originalQuestions: [],
    questions: [
        {
            id: 1,
            question: "Question #1",
            image: "",
            correctAnswerIds: [1],
            answers: [
                {id: 2, answer: "Answer #2", image: ""},
                {id: 3, answer: "Answer #3", image: ""},
                {id: 4, answer: "Answer #4", image: ""},
                {id: 5, answer: "Answer #1", image: ""},
                {id: 6, answer: "Answer #5", image: ""},
            ],
            answered: false,
            answerId: 2,
            isCorrect: false,
        },
    ],
    done: false,
    testResults: null,
    loading: false,
    error: false,
    errorMessage: "",
};

const setQuestions = (array) => {
    return array.map(question => ({
        ...question,
        answered: false,
        answerId: null,
        isCorrect: false,
        answers: question.answers.map((answer) => ({
            ...answer,
            selected: false,
            isCorrect: question.correctAnswerIds.includes(answer.id),
        })),
    }))
}


export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CURRENT_QUESTION_CHANGED:
            return {
                ...state,
                currentQuestionId: action.payload,
            }
        case actionTypes.TOPIC_SUCCESS:
            const { tests } = action.payload;
            return {
                ...state,
                originalQuestions: tests,
                questions: setQuestions(tests),
                currentQuestionId: tests[0]?.id ?? 0,
            }
        case actionTypes.QUESTION_ANSWERED:
            const { questionId, answerId } = action.payload;
            const updateQuestionIdx = state.questions.findIndex(question => question.id === questionId);
            const updateQuestionItem = state.questions[updateQuestionIdx];
            return {
                ...state,
                questions: [
                    ...state.questions.slice(0, updateQuestionIdx),
                    {
                        ...updateQuestionItem,
                        answered: true,
                        answerId: answerId,
                        isCorrect: updateQuestionItem.correctAnswerIds.includes(answerId),
                    },
                    ...state.questions.slice(updateQuestionIdx + 1),
                ],
            }
        case actionTypes.TOPIC_TEST_DONE:
            return {
                ...state,
                done: true,
                testResults: action.payload,
                currentQuestionId: null,
            }
        case actionTypes.TOPIC_TEST_RETRY:
            return {
                ...state,
                testResults: null,
                questions: setQuestions(state.originalQuestions),
                currentQuestionId: state.originalQuestions[0].id ?? 0,
                done: false,
            }
        default:
            return state;
    }
}