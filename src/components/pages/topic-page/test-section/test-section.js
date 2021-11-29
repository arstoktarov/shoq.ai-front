import {Box, Fade, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import QuestionItem from "./question-item";
import TopicSectionLayout from "components/layouts/topic-section-layout";
import CustomizedStepper from "components/pages/topic-page/test-section/question-stepper";
import {connect} from "react-redux";
import {
    currentQuestionIdChanged,
    finishTest,
    questionAnswered,
    topicTestDone,
    topicTestRetry
} from "actions/topic-test-actions";
import AnswerItem from "components/pages/topic-page/test-section/answer-item";
import {useParams} from "react-router-dom";
import {loadTopic} from "actions/topic-actions";

const useStyles = makeStyles({
    primaryText: {
        textIndent: "50px",
        marginRight: '10px'
    },
    secondaryTextBox: {
        display: "flex",
    },
    button: {
        textTransform: "none",
        fontSize: "1rem",
    },
    input: {
        marginTop: "10px",
        width: "600px",
    },
});

const TestSection = (props) => {
    const classes = useStyles();
    const {topicId} = useParams();

    const { topic, loadingTopic, questions, testResults, questionAnswered, testDone, currentQuestionId, changeCurrentQuestion, testDoneAction, testRetryAction, finishTest } = props;

    const [fade, setFade] = useState(true);

    const allQuestionsAnswered = () => {
        return questions.every(question => question.answered === true)
    }

    const isTestDone = () => {
        return allQuestionsAnswered() || testResults?.bestAttempt;
    }

    useEffect(() => {
        if (isTestDone()) {
            console.log("Test is done");
            setTimeout(() => {
                setTestDone();
            }, 1000)
        }
    }, [questions]);

    useEffect(() => {
        setFade(true);
    }, [currentQuestionId]);

    const setTestDone = () => {
        finishTest({
            topicId: topicId,
            correctCount: questions.filter(question => question.isCorrect).length,
        });
        loadTopic();
    }

    const showTestDoneView = () => {
        changeCurrentQuestion(null);
    }

    const handleAnswerClick = (questionId, answerId) => {
        questionAnswered({ questionId, answerId });
        setTimeout(() => {
            setFade(false);
            const questionIdx = questions.findIndex(question => question.id === questionId);
            if (questionIdx < questions.length - 1) {
                setTimeout(() => {
                    changeCurrentQuestion(questions[questionIdx + 1].id);
                }, 500)
            }
        }, 1000)
    }

    const handleStepClick = (item) => {
        if (testDone) {
            changeCurrentQuestion(item.id);
        }
    }

    const handleRetryClick = () => {
        testRetryAction();
    }

    const handleDoneClick = () => {
        if (testDone) {
            showTestDoneView();
        }
    }

    const { threshold = 0, bestAttempt: { totalQuestions = 0, correctAnswers = 0 } = {} } = testResults ?? {};

    const gradePercentage = (correctAnswers / totalQuestions) * 100;

    console.log("topic", topic);

    return (
        <TopicSectionLayout title="Тест" subtitle={`вопросы: ${(questions.findIndex(question => question.id === currentQuestionId)) + 1}/${questions.length}`}>
                {
                    currentQuestionId === null ?
                        <Box>
                            <Fade timeout={500} in={testResults !== null}>
                                <Box mt={4}>
                                    <AnswerItem
                                        disabled
                                        idx={23}
                                        title={`Вы получили ${gradePercentage.toFixed()}% (${correctAnswers} правильных из ${totalQuestions}). Вы можете пересдать тест`}
                                        variant={((correctAnswers/totalQuestions) > threshold) ? "correct" : "incorrect"}
                                    />
                                    <AnswerItem
                                        onClick={handleRetryClick}
                                        idx={14}
                                        title="Пересдать тест"
                                    />
                                </Box>
                            </Fade>
                        </Box>
                            :
                        <Fade timeout={500} in={fade}>
                            <Box>
                                <QuestionItem
                                    texts={topic?.texts ?? []}
                                    question={questions.find(question => question.id === currentQuestionId) ?? {}}
                                    onAnswerClick={handleAnswerClick}
                                    answered={false}
                                />
                            </Box>
                        </Fade>
                }
                <CustomizedStepper onDoneClick={handleDoneClick} done={testDone} doneSuccess={(correctAnswers/totalQuestions) > threshold} onStepClick={handleStepClick} items={questions} currentQuestionId={currentQuestionId} />
        </TopicSectionLayout>
    );

}

const mapStateToProps = ({ topicTest }) => {
    return {
        questions: topicTest.questions,
        currentQuestionId: topicTest.currentQuestionId,
        testDone: topicTest.done,
        testResults: topicTest.testResults,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopic: (topicId) => dispatch(loadTopic(topicId)),
        questionAnswered: payload => dispatch(questionAnswered(payload)),
        changeCurrentQuestion: payload => dispatch(currentQuestionIdChanged(payload)),
        testDoneAction: payload => dispatch(topicTestDone(payload)),
        testRetryAction: payload => dispatch(topicTestRetry(payload)),
        finishTest: payload => dispatch(finishTest(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSection);