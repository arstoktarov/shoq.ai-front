import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, IconButton, Modal} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import BaigeMenu from "./baige-menu";
import Typography from "components/mui-customized/Typography";
import {connect} from "react-redux";
import {
    getBaigeById,
    baigeAnswerSelected, baigeEnded,
    baigeFinish,
    baigeQuestionMarked,
} from "actions/baige-test-actions";
import BaigeQuestionItem from "./baige-question-item";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { colors } from "constantValues";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import withRedirect from "../../../hoc/withRedirect";
import BaigeResultView from "components/pages/baige-page/baige-result-view";
import BaigeResultMenu from "components/pages/baige-test-page/baige-result-menu";


const BaigeTestResult = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { baigeTest, loading, error, loadBaigeTest, baigeEnded } = props;
    const { headers = [], questions = [], elapsedSeconds = 0, texts = [], prevQuestionId, nextQuestionId } = baigeTest;

    const [showResults, setShowResults] = useState(true);

    useEffect(() => {
        const currentBaigeId = localStorage.getItem("currentBaigeId");
        if (currentBaigeId) {
            loadBaigeTest(currentBaigeId);
        }
        else {
            history.push('/baige');
        }
    }, []);

    useEffect(() => {
        if (baigeTest.id && !baigeTest.result) {
            console.log(baigeTest);
            history.push('/baige');
        }
    }, [baigeTest]);

    useEffect(() => {
        scrollToStart();
    }, [prevQuestionId || nextQuestionId])

    const getTexts = () => {
        return texts ?? [];
    }

    const scrollToStart = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const getQuestionResultData = () => {
        return questions.map(({ id, isMarked, selectedAnswerIds }) => ({
            questionId: id,
            isMarked,
            selectedAnswerIds,
        }));
    }

    const getTrailEndedObject = (moveTo) => {
        return {
            moveTo,
            baigeId: baigeTest.id,
            questionResultData: getQuestionResultData(),
        }
    }

    const handleShowResultsClick = () => {
        setShowResults(showResults => !showResults);
    }

    const handleMenuCellClick = ({ id, isCurrent }) => {
        setShowResults(false);
        if (!isCurrent) {
            baigeEnded(getTrailEndedObject(id));
        }
    }
    const handlePrevPageClick = () => {
        setShowResults(false);
        if (prevQuestionId) {
            baigeEnded(getTrailEndedObject(prevQuestionId));
        }
    }
    const handleNextPageClick = () => {
        setShowResults(false);
        if (nextQuestionId) {
            baigeEnded(getTrailEndedObject(nextQuestionId));
        }
    }

    const handleQuestionMarkClick = (questionId) => {
    }
    const handleAnswerClick = (question, answer) => (event) =>  {
        
    }

    return (
        <MainLayout menuComponent={<BaigeResultMenu baigeFinished={!showResults} onShowResultsClick={handleShowResultsClick} baigeTest={baigeTest} headers={headers} onCellClick={handleMenuCellClick}/>}>
            <Backdrop style={{zIndex: 99999}} open={loading} ><CircularProgress /></Backdrop>
            <Box p={2}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography customVariant="subtitleRoboto" fontWeight="500">Прошло {new Date(1000 * (elapsedSeconds ?? 0)).toISOString().substr(11, 8)}</Typography>
                </Box>
                {
                    showResults
                        ?
                        <BaigeResultView result={baigeTest.result ?? {}}/>
                        :
                        <Box>
                            <Box mt={4}>
                                {
                                    questions.map((question) => (
                                        <BaigeQuestionItem
                                            baigeFinished={true}
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
                }
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
    loadBaigeTest: (payload) => dispatch(getBaigeById(payload)),
    baigeEnded: (payload) => dispatch(baigeEnded(payload)),
    baigeFinish: (payload) => dispatch(baigeFinish(payload)),
    questionMarked: (payload) => dispatch(baigeQuestionMarked(payload)),
    answerSelected: (payload) => dispatch(baigeAnswerSelected(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRedirect()(BaigeTestResult));