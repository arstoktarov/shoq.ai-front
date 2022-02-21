import {actionTypes} from "../constants";

const initialState = {
    baigeTest: {
        elapsedSeconds: 0,
        headers: [],
        id: 0,
        nextQuestionId: 0,
        prevQuestionId: 0,
        questions: [],
        result: null,
        texts: [],
        redirectTo: [],
    },
    loading: false,
    error: false,
};

const updateQuestions = (questions, item, idx) => {
    return [
        ...questions.slice(0, idx),
        item,
        ...questions.slice(idx + 1),
    ];
}

const updateHeaderCell = (headers, questionId, newValues) => {
    const updateHeaderIdx = headers.findIndex(header => header.isActive);
    const updateHeaderItem = headers[updateHeaderIdx];
    const updateCellIdx = updateHeaderItem.cells.findIndex(cell => cell.id === questionId);
    const updateCellItem = updateHeaderItem.cells[updateCellIdx];
    return [
        ...headers.slice(0, updateHeaderIdx),
        {
            ...updateHeaderItem,
            cells: [
                ...updateHeaderItem.cells.slice(0, updateCellIdx),
                {
                    ...updateCellItem,
                    ...newValues,
                },
                ...updateHeaderItem.cells.slice(updateCellIdx + 1),
            ]
        },
        ...headers.slice(updateHeaderIdx + 1),
    ];
}

const updateQuestion = (questions, questionId, newValues) => {
    const updateQuestionIdx = questions.findIndex(question => question.id === questionId);
    const updateQuestionItem = questions[updateQuestionIdx];
    return [
        ...questions.slice(0, updateQuestionIdx),
        {
            ...updateQuestionItem,
            ...newValues,
        },
        ...questions.slice(updateQuestionIdx + 1),
    ];
}

const updateSelectedAnswerIds = (question, answer) => {
    const { selectedAnswerIds, type } = question;
    let selectedAnswerIdsResult = [];
    switch (type) {
        case "SINGLE": {
            selectedAnswerIdsResult = (selectedAnswerIds.find(a => a === answer.id)) ? [] : [answer.id];
            break;
        }
        case "MULTIPLE": {
            if (selectedAnswerIds.find(a => a === answer.id)) {
                selectedAnswerIdsResult = selectedAnswerIds.filter((v) => v !== answer.id);
            }
            else {
                if (selectedAnswerIds.length < 3) {
                    selectedAnswerIdsResult = [
                        ...selectedAnswerIds,
                        answer.id,
                    ];
                }
                else {
                    selectedAnswerIdsResult = selectedAnswerIds;
                }
            }
            break;
        }
    }
    return selectedAnswerIdsResult;
}

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.BAIGE_TEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.BAIGE_TEST_SUCCESS:
            return {
                ...state,
                baigeTest: action.payload,
                loading: false,
                error: false,
            }
        case actionTypes.BAIGE_TEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case actionTypes.BAIGE_ANSWER_SELECTED: {
            const { questionId, answerId } = action.payload;
            const { baigeTest: { questions, headers } } = state;
            const question = questions.find((q) => q.id === questionId);
            const answer = question.answers.find((a) => a.id === answerId);
            const selectedAnswerIds = updateSelectedAnswerIds(question, answer);
            return {
                ...state,
                baigeTest: {
                    ...state.baigeTest,
                    headers: updateHeaderCell(headers, questionId, {
                        isAnswered: selectedAnswerIds.length > 0
                    }),
                    questions: updateQuestion(questions, questionId, {
                        isAnswered: true,
                        selectedAnswerIds: selectedAnswerIds,
                    }),
                }
            }
        }
        case actionTypes.BAIGE_QUESTION_MARKED: {
            const questionId = action.payload;
            const { baigeTest: { questions, headers } } = state;
            const updateQuestionIdx = questions.findIndex(question => question.id === questionId);
            const updateQuestionItem = questions[updateQuestionIdx];

            const updateHeaderIdx = headers.findIndex(header => header.isActive);
            const updateHeaderItem = headers[updateHeaderIdx];
            const updateCellIdx = updateHeaderItem.cells.findIndex(cell => cell.id === questionId);
            const updateCellItem = updateHeaderItem.cells[updateCellIdx];
            return {
                ...state,
                baigeTest: {
                    ...state.baigeTest,
                    headers: updateHeaderCell(headers, questionId, {isMarked: !updateCellItem.isMarked}),
                    questions: updateQuestion(questions, questionId, {isMarked: !updateQuestionItem.isMarked}),
                }
            }
        }
        default:
            return state;
    }
}