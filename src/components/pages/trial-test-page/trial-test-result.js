import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, IconButton, Modal} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import TrialMenu from "./trial-menu";
import Typography from "components/mui-customized/Typography";
import {connect} from "react-redux";
import {
    getTrialById,
    trialAnswerSelected, trialEnded,
    trialFinish,
    trialQuestionMarked,
} from "actions/trial-test-actions";
import TrialQuestionItem from "./trial-question-item";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { colors } from "constantValues";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";
import withRedirect from "../../../hoc/withRedirect";
import TrialResultView from "components/pages/trial-page/trial-result-view";
import TrialResultMenu from "components/pages/trial-test-page/trial-result-menu";


const TrialTestResult = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { trialTest, loading, error, loadTrialTest, trialEnded } = props;
    const { headers = [], questions = [], elapsedSeconds = 0, texts = [], prevQuestionId, nextQuestionId } = trialTest;

    const [showResults, setShowResults] = useState(true);

    useEffect(() => {
        const currentTrialId = localStorage.getItem("currentTrialId");
        if (currentTrialId) {
            loadTrialTest(currentTrialId);
        }
        else {
            history.push('/trial');
        }
    }, []);

    useEffect(() => {
        if (trialTest.id && !trialTest.result) {
            console.log(trialTest);
            history.push('/trial');
        }
    }, [trialTest]);

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
            trialId: trialTest.id,
            questionResultData: getQuestionResultData(),
        }
    }

    const handleShowResultsClick = () => {
        setShowResults(showResults => !showResults);
    }

    const handleMenuCellClick = ({ id, isCurrent }) => {
        setShowResults(false);
        if (!isCurrent) {
            trialEnded(getTrailEndedObject(id));
        }
    }
    const handlePrevPageClick = () => {
        setShowResults(false);
        if (prevQuestionId) {
            trialEnded(getTrailEndedObject(prevQuestionId));
        }
    }
    const handleNextPageClick = () => {
        setShowResults(false);
        if (nextQuestionId) {
            trialEnded(getTrailEndedObject(nextQuestionId));
        }
    }

    const handleQuestionMarkClick = (questionId) => {
    }
    const handleAnswerClick = (question, answer) => (event) =>  {
        
    }

    return (
        <MainLayout menuComponent={<TrialResultMenu trialFinished={!showResults} onShowResultsClick={handleShowResultsClick} trialTest={trialTest} headers={headers} onCellClick={handleMenuCellClick}/>}>
            <Backdrop style={{zIndex: 99999}} open={loading} ><CircularProgress /></Backdrop>
            <Box p={2}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography customVariant="subtitleRoboto" fontWeight="500">Прошло {new Date(1000 * (elapsedSeconds ?? 0)).toISOString().substr(11, 8)}</Typography>
                </Box>
                {
                    showResults
                        ?
                        <TrialResultView result={trialTest.result ?? {}}/>
                        :
                        <Box>
                            <Box mt={4}>
                                {
                                    questions.map((question) => (
                                        <TrialQuestionItem
                                            trialFinished={true}
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

const mapStateToProps = ({ trialTest }) => ({
    trialTest: trialTest.trialTest,
    loading: trialTest.loading,
    error: trialTest.error,
});

const mapDispatchToProps = (dispatch) => ({
    loadTrialTest: (payload) => dispatch(getTrialById(payload)),
    trialEnded: (payload) => dispatch(trialEnded(payload)),
    trialFinish: (payload) => dispatch(trialFinish(payload)),
    questionMarked: (payload) => dispatch(trialQuestionMarked(payload)),
    answerSelected: (payload) => dispatch(trialAnswerSelected(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRedirect()(TrialTestResult));