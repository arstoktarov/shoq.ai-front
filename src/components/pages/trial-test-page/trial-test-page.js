import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, IconButton, Modal} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import TrialMenu from "./trial-menu";
import Typography from "components/mui-customized/Typography";
import Button from "components/mui-customized/Button";
import {connect} from "react-redux";
import {
    loadTrialTest,
    trialAnswerSelected, trialEnded,
    trialFinish,
    trialQuestionMarked,
    trialRunning
} from "actions/trial-test-actions";
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import TrialQuestionItem from "./trial-question-item";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { colors } from "constantValues";
import useStyles from "./styles";
import {Redirect, useHistory} from "react-router-dom";
import withRedirect from "../../../hoc/withRedirect";
import TrialResultView from "components/pages/trial-page/trial-result-view";


const TrialTestPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { trialTest, loading, error, loadTrialTest, trialFinish, trialRunning, questionMarked, answerSelected } = props;
    const { headers = [], questions = [], elapsedSeconds = 0, texts = [], prevQuestionId, nextQuestionId } = trialTest;
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!trialTest.id) {
            loadTrialTest();
        }
    }, []);

    useEffect(() => {
        if (trialTest.id) {
            localStorage.setItem('currentTrialId', trialTest.id);
        }
        setSeconds(elapsedSeconds);
        let interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [trialTest]);

    useEffect(() => {
        scrollToStart();
    }, [prevQuestionId || nextQuestionId]);

    useEffect(() => {
        if (error) history.push('/trial');
    }, [error]);

    const getTexts = () => {
        return texts ?? [];
    }

    const scrollToStart = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handlePauseClick = () => {
        trialFinish({
            trialId: trialTest.id,
            mode: "SAVE",
            questionResultData: getQuestionResultData(),
        });
        history.push('/trial');
    }

    const handleStopClick = () => {
        localStorage.setItem("currentTrialId", trialTest.id);
        trialFinish({
            trialId: trialTest.id,
            mode: "END",
            questionResultData: getQuestionResultData(),
        });
    }

    const getQuestionResultData = () => {
        return questions.map(({ id, isMarked, selectedAnswerIds }) => ({
            questionId: id,
            isMarked,
            selectedAnswerIds,
        }));
    }

    const getTrailRunningObject = (moveTo) => {
        return {
            moveTo,
            trialId: trialTest.id,
            questionResultData: getQuestionResultData(),
        }
    }

    const handleMenuCellClick = ({ id, isCurrent }) => {
        if (!isCurrent) {
            trialRunning(getTrailRunningObject(id));
        }
    }

    const handlePrevPageClick = () => {
        if (prevQuestionId) {
            trialRunning(getTrailRunningObject(prevQuestionId));
        }
    }

    const handleNextPageClick = () => {
        if (nextQuestionId) {
            trialRunning(getTrailRunningObject(nextQuestionId));
        }
    }

    const handleQuestionMarkClick = (questionId) => {
        questionMarked(questionId);
    }

    const handleAnswerClick = (question, answer) => (event) =>  {
        answerSelected({
            questionId: question.id,
            answerId: answer.id,
        });
    }

    if (trialTest?.result) return (<Redirect to="/trial/test/result"/>);

    return (
        <MainLayout menuComponent={<TrialMenu trialTest={trialTest} headers={headers} onCellClick={handleMenuCellClick}/>}>
            <Backdrop style={{zIndex: 99999}} open={loading || trialTest.result !== null} ><CircularProgress /></Backdrop>
            <Box p={2}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography customVariant="subtitleRoboto" fontWeight="500">Прошло {new Date(1000 * (seconds ?? 0)).toISOString().substr(11, 8)}</Typography>
                    {
                        !trialTest.result ?
                        <Box display="flex" flexDirection="row" ml="auto" alignItems="center">
                            <Button onClick={handlePauseClick} variant="contained" color="primary"
                                    startIcon={<PauseRoundedIcon/>}>
                                Сохранить и выйти
                            </Button>
                            <Box ml={2}>
                                <Button onClick={handleStopClick} variant="contained" color="primary"
                                        startIcon={<StopRoundedIcon/>}>
                                    Завершить
                                </Button>
                            </Box>
                        </Box>
                        : ""
                    }
                </Box>
                <Box>
                    <Box mt={4}>
                        {
                            questions.map((question) => (
                                <TrialQuestionItem
                                    trialFinished={false}
                                    text={getTexts().find(text => text.id === question.textId)}
                                    onAnswerClick={handleAnswerClick}
                                    onMarkClick={handleQuestionMarkClick}
                                    question={question}
                                    key={question.id}
                                />
                            ))
                        }
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        {
                            prevQuestionId ?
                                <IconButton
                                    onClick={handlePrevPageClick}
                                    style={{backgroundColor: colors.LIGHT_GREY}}
                                    color="primary">
                                    <ArrowBackIcon fontSize="large"/>
                                </IconButton>
                                : ""
                        }
                        {
                            nextQuestionId ?
                                <Box ml={6}>
                                    <IconButton
                                        onClick={handleNextPageClick}
                                        style={{backgroundColor: colors.LIGHT_GREY}}
                                        color="primary">
                                        <ArrowForwardIcon fontSize="large"/>
                                    </IconButton>
                                </Box>
                                : ""
                        }
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ trialTest }) => ({
    trialTest: trialTest.trialTest,
    loading: trialTest.loading,
    error: trialTest.error,
});

const mapDispatchToProps = (dispatch) => ({
    loadTrialTest: (payload) => dispatch(loadTrialTest(payload)),
    trialRunning: (payload) => dispatch(trialRunning(payload)),
    trialFinish: (payload) => dispatch(trialFinish(payload)),
    questionMarked: (payload) => dispatch(trialQuestionMarked(payload)),
    answerSelected: (payload) => dispatch(trialAnswerSelected(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRedirect()(TrialTestPage));