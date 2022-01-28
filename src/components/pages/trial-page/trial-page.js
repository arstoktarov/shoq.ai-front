import React, {useEffect, useState} from "react";
import {
    Backdrop,
    Box, CircularProgress,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import Typography from "components/mui-customized/Typography";
import {withStyles} from "@material-ui/core/styles";
import Button from "components/mui-customized/Button";
import {PlayArrowRounded} from "@material-ui/icons";
import ReplayIconRounded from '@material-ui/icons/ReplayRounded';
import {connect} from "react-redux";
import {
    continueTrial,
    getTrialPage,
    loadSelectives,
    setSelectives,
    startTrial
} from "actions/trial-initial-page-actions";
import SelectivesSection from "components/pages/trial-page/selectives-section";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";


const StyledTableCell = withStyles((theme) => ({
    root: {
        borderBottom: "none",
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        borderCollapse: "none",
        cursor: "pointer",
        '&:nth-of-type(odd)': {
            backgroundColor: "#F7F9FA",
        },
        '&:hover': {
            backgroundColor: "#d0d0d0",
         },
    },
}))(TableRow);

const TrialPage = (props) => {
    const classes = useStyles();
    const routerHistory = useHistory();

    const { trialPage, trialTest, loading, getTrialPage, startTrial, continueTrial } = props;
    const { proceed = null, history = [] } = trialPage;

    const [readyToRedirect, setReadyToRedirect] = useState(false);

    useEffect(() => {
        getTrialPage();
    }, []);

    useEffect(() => {
        if (trialTest && readyToRedirect) {
            setReadyToRedirect(false);
            routerHistory.push('/trial/test');
        }
    }, [trialTest]);

    const handleStartTrialClick = () => {
        setReadyToRedirect(true);
        startTrial();
    }

    const handleContinueTrialClick = () => {
        setReadyToRedirect(true);
        continueTrial();
    }

    const onHistoryTrialClick = (id) => (event) => {
        localStorage.setItem("currentTrialId", id);
        routerHistory.push('/trial/test/result');
    }

    return (
        <MainLayout>
            <Backdrop style={{zIndex: 99999}} open={loading || readyToRedirect}>
                <CircularProgress />
            </Backdrop>
            <Box maxWidth="700px" ml={5} mt={2} display="flex" flexDirection="column">
                <SelectivesSection />
                <Box mt={3}>
                    <Typography className={classes.infoText}>
                        Вы можете пройти пробное тестирование для проверки уровня своих знаний и готовности к ЕНТ. 
                        Пробное тестирование от Shoq.ai имеет такую же структуру как современная 140-бальная система ЕНТ.
                        Начав тест вы увидите таймер, который позволит вам считать время, за которое вы проходите тест. 
                        Таймер не имеет ограничений, и служит только в целях информирования. 
                        В процессе теста вы также увидите две кнопки: "Сохранить и выйти" и "Завершить".
                        Нажмите "Сохранить и выйти" если вы хотите временно выйти из теста, сохранив все свои ответы и продолжить позже.
                        В случае если вы закончили тест и хотите увидеть результаты, нажмите кнопку "Завершить".
                    </Typography>
                </Box>
                <Box mt={5} display="flex" flexDirection="column">
                    {
                        proceed ?
                        <Typography customVariant="subtitleRoboto">Вы начали 17:05 / 05.12.2019 (длительность 0:24:52)</Typography>
                        : ""
                    }
                    <Box mt={1} display="flex" flexDirection="row" justifyContent="space-between">
                        {
                            proceed ?
                            <Button onClick={handleContinueTrialClick} variant="contained" color="primary"
                                    startIcon={<PlayArrowRounded/>}>Продолжить</Button>
                            : ""
                        }
                        <Button onClick={handleStartTrialClick} variant="contained" color="primary" startIcon={<ReplayIconRounded />}>Начать с начала</Button>
                    </Box>
                </Box>

                <Box mt={5}>
                    <Typography>История пробных тестов:</Typography>
                    <TableContainer component={Box}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">
                                        <Typography customVariant="subtitleRoboto">
                                            Начало
                                        </Typography>
                                        </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography customVariant="subtitleRoboto">
                                            Результаты
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography customVariant="subtitleRoboto">
                                            Длительность
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((row, idx) => (
                                    <StyledTableRow onClick={onHistoryTrialClick(row.id)} key={idx}>
                                        <StyledTableCell component="th" scope="row">
                                            <Typography customVariant="subtitleRoboto">
                                                {row.startData}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="subtitleRoboto">
                                                {row.point}/{row.maxPoint}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="subtitleRoboto">
                                                {new Date(1000 * (row.secElapsed ?? 0)).toISOString().substr(11, 8)}
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ user, trialInitialPage, selectivesReducer, trialTest }) => ({
    trialTest: trialTest.trialTest,
    selectivesList: selectivesReducer.selectivesList,
    selectives: selectivesReducer.selectives,
    trialPage: trialInitialPage.trialPage,
    loading: trialInitialPage.loading,
    user: user.user,
});

const mapDispatchToProps = (dispatch) => ({
    loadSelectives: () => dispatch(loadSelectives()),
    setSelectives: (payload) => dispatch(setSelectives(payload)),
    getTrialPage: () => dispatch(getTrialPage()),
    startTrial: () => dispatch(startTrial()),
    continueTrial: () => dispatch(continueTrial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrialPage);