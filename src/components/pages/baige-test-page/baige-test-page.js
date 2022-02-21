import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, IconButton, Modal} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import BaigeMenu from "./baige-menu";
import Typography from "components/mui-customized/Typography";
import Button from "components/mui-customized/Button";
import {connect} from "react-redux";
import {
    loadBaigeTest,
    baigeAnswerSelected, baigeEnded,
    baigeFinish,
    baigeQuestionMarked,
    baigeRunning
} from "actions/baige-test-actions";
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import BaigeQuestionItem from "./baige-question-item";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { colors } from "constantValues";
import useStyles from "./styles";
import {Redirect, useHistory} from "react-router-dom";
import withRedirect from "../../../hoc/withRedirect";
import BaigeResultView from "components/pages/baige-page/baige-result-view";


const BaigeTestPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { baigeTest, loading, error, loadBaigeTest, baigeFinish, baigeRunning, questionMarked, answerSelected } = props;
    const { headers = [], questions = [], elapsedSeconds = 0, texts = [], prevQuestionId, nextQuestionId } = baigeTest;
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!baigeTest.id) {
            loadBaigeTest();
        }
    }, []);

    useEffect(() => {
        if (baigeTest.id) {
            localStorage.setItem('currentBaigeId', baigeTest.id);
        }
        setSeconds(elapsedSeconds);
        let interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [baigeTest]);

    useEffect(() => {
        scrollToStart();
    }, [prevQuestionId || nextQuestionId]);

    useEffect(() => {
        if (error) history.push('/baige');
    }, [error]);

    const getTexts = () => {
        return texts ?? [];
    }

    const scrollToStart = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // const handlePauseClick = () => {
    //     BaigeFinish({
    //         baigeId: baigeTest.id,
    //         mode: "SAVE",
    //         questionResultData: getQuestionResultData(),
    //     });
    //     history.push('/baige');
    // }

    const handleStopClick = () => {
        localStorage.setItem("currentBaigeId", baigeTest.id);
        baigeFinish({
            baigeId: baigeTest.id,
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

    const getBaigeRunningObject = (moveTo) => {
        return {
            moveTo,
            baigeId: baigeTest.id,
            questionResultData: getQuestionResultData(),
        }
    }

    const handleMenuCellClick = ({ id, isCurrent }) => {
        if (!isCurrent) {
            baigeRunning(getBaigeRunningObject(id));
        }
    }

    const handlePrevPageClick = () => {
        if (prevQuestionId) {
            baigeRunning(getBaigeRunningObject(prevQuestionId));
        }
    }

    const handleNextPageClick = () => {
        if (nextQuestionId) {
            baigeRunning(getBaigeRunningObject(nextQuestionId));
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

    if (baigeTest?.result) return (<Redirect to="/baige/test/result"/>);

    return (
        <MainLayout menuComponent={<BaigeMenu baigeTest={baigeTest} headers={headers} onCellClick={handleMenuCellClick}/>}>
            <Backdrop style={{zIndex: 99999}} open={loading || baigeTest.result !== null} ><CircularProgress /></Backdrop>
            <Box p={2}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography customVariant="subtitleRoboto" fontWeight="500">Прошло {new Date(1000 * (seconds ?? 0)).toISOString().substr(11, 8)}</Typography>
                    {
                        !baigeTest.result ?
                        <Box display="flex" flexDirection="row" ml="auto" alignItems="center">
                            {/* <Button onClick={handlePauseClick} variant="contained" color="primary"
                                    startIcon={<PauseRoundedIcon/>}>
                                Сохранить и выйти
                            </Button> */}
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
                                <BaigeQuestionItem
                                    baigeFinished={false}
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

const mapStateToProps = ({ baigeTest }) => ({
    baigeTest: baigeTest.baigeTest,
    loading: baigeTest.loading,
    error: baigeTest.error,
});

const mapDispatchToProps = (dispatch) => ({
    loadBaigeTest: (payload) => dispatch(loadBaigeTest(payload)),
    baigeRunning: (payload) => dispatch(baigeRunning(payload)),
    baigeFinish: (payload) => dispatch(baigeFinish(payload)),
    questionMarked: (payload) => dispatch(baigeQuestionMarked(payload)),
    answerSelected: (payload) => dispatch(baigeAnswerSelected(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRedirect()(BaigeTestPage));