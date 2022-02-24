import React, { useEffect } from "react";
import { Avatar, Box, IconButton, FormControl, MenuItem, Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MainLayout from "components/layouts/main-layout";
import Typography from "components/mui-customized/Typography";
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import FilledIconButton from "components/mui-customized/FilledIconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "components/mui-customized/Button";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {loadBaige} from "actions/baige-page-actions";
import SubjectSelectivesSection from "../subjects-page/subjects-selectives-section";
import {useHistory} from "react-router-dom";
import SelectivesSection from "components/pages/trial-page/selectives-section";

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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "800px",
        borderRadius: 0,
        boxShadow: "none",
        height: "100%",
        borderRight: "1px solid #CCD4E1",
        backgroundColor: "#F7F9FA",
    },
    card: {
        backgroundColor: "white",
        marginBottom: "10px",
        borderRadius: 0,
        borderBottom: "1px solid #CCD4E1",
        borderTop: "1px solid #CCD4E1",
        overflow: "hidden",
        //padding: "24px 24px 48px 24px"
    },
    baigeDay: {
        width: "180px",
        height: "247px",
        //boxSizing: "border-box",
        padding: "18px 18px 24px 18px",
        background: "#E8F5FE",
        borderRadius: "10px",
        margin: "0 12px 0 0",
        flexShrink: "0",
    },
    startBaigeButton: {
        width: "200px",
        height: "35px",
        "&:disabled": {
            backgroundColor: "#5B7083",
            color: "white",
        },
        disabled: {}
    },
    baigeText: {
        lineHeight: "1.2",
    }
}));

const BaigePage = (props) => {
    const classes = useStyles();
    const routerHistory = useHistory();

    const { loadBaige, baigeData } = props;

    useEffect(() => {
        loadBaige();
    }, []);

    const { isBought = false, isBaigeActive = false, items = [], top = [], history = [] } = baigeData ?? {};

    const onHistoryBaigeClick = (id) => (event) => {
        localStorage.setItem("currentBaigeId", id);
        routerHistory.push('/baige/test/result');
    }

    return (
        <MainLayout>
            <Box className={classes.root}>
                <Box className={classes.card}>
                    <Box display="flex" flexDirection="row" px={3} pt={3} pb={3}>
                        <Box display="flex" flexDirection="row">
                            <Typography>Байге</Typography>
                            <Box mx={0.5}>
                                <Typography align="center" className={classes.divider}>&bull;</Typography>
                            </Box>
                            {
                                isBought ?
                                <Typography fontSize="1rem" htmlcolor="#4ECD88"> вы учавствуете</Typography>
                                :
                                <Typography fontSize="1rem" htmlcolor="#ED2966"> вы не учавствуете</Typography>
                            }
                        </Box>
                        <Box ml="auto" mr={3}>
                            <FilledIconButton style={{padding: 0, color: "#E8F5FE", backgroundColor: "#1DA1F2"}} variant="outlined"><HelpRoundedIcon /></FilledIconButton>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.card}>
                    <Box display="flex" flexDirection="row" px={3} pt={3} pb={3} mt={1}>
                        {
                            items.map((item) => (
                                <Box boxSizing="border-box" position="relative" border={item.isBaige ? "5px solid #F2994A" : "1px solid #CCD4E1"} overflow="hidden" key={item.day} mx={2} style={{
                                    borderRadius: "5px",
                                    width: "64px", 
                                }}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        {
                                            !item.isBaige ?
                                                <Typography fontFamily="Roboto" fontSize="22px" fontWeight="bolder">{item.day}</Typography>
                                            :
                                            <Typography className={classes.baigeText} fontFamily="Roboto" fontSize="22px" fontWeight="bolder">{item.day}</Typography>
                                        }
                                        <Typography customVariant="littleTextRoboto">{item.weekDay}</Typography>
                                    </Box>
                                    {
                                        item.isBaige ?
                                        <Box bgcolor="#F2994A" display="flex" flexDirection="column" alignItems="center" width="100%" height="22px">
                                            <Box mt={0.3}>
                                                <Typography htmlcolor="white" fontSize="14px">байге</Typography>
                                            </Box>
                                        </Box>
                                        :
                                        item.status === -1 ?
                                        <Box bgcolor="#ED2966" display="flex" flexDirection="column" alignItems="center" width="100%" height="23px">
                                            <Typography htmlcolor="white" fontSize="14px">провал</Typography>
                                        </Box>
                                        :
                                        item.status === 0 ?
                                        <Box bgcolor="#F2994A" display="flex" flexDirection="column" alignItems="center" width="100%" height="23px">
                                            <Typography htmlcolor="white" fontSize="14px">ждем</Typography>
                                        </Box>
                                        :
                                        item.status === 1 ?
                                        <Box bgcolor="#4ECD88" display="flex" flexDirection="column" alignItems="center" width="100%" height="23px">
                                            <Typography htmlcolor="white" fontSize="14px">пройден</Typography>
                                        </Box>
                                        :
                                        <Box bgcolor="#ED2966" display="flex" flexDirection="column" alignItems="center" width="100%" height="23px">
                                            <Typography htmlcolor="white" fontSize="14px">ждем</Typography>
                                        </Box>
                                    }
                                </Box>
                                // <Box key={item} className={classes.baigeDay}>
                                //     <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="space-between">
                                //         <Box>
                                //             <Typography fontSize="24px">Пн</Typography>
                                //         </Box>
                                //         <Box>
                                //             <Box width="100%" bottom="30px" display="flex" flexDirection="row">
                                //                 <Typography fontSize="18px">Уроки</Typography>
                                //                 <Box ml="auto">
                                //                     <Typography fontSize="18px">2</Typography>
                                //                 </Box>
                                //             </Box>
                                //             <Box mt={1} width="100%" bottom="30px" display="flex" flexDirection="row">
                                //                 <Typography fontSize="18px">Игры</Typography>
                                //                 <Box ml="auto">
                                //                     <Typography fontSize="18px">10</Typography>
                                //                 </Box>
                                //             </Box>
                                //         </Box>
                                //     </Box>
                                // </Box>
                            ))
                        }
                    </Box>
                    <Box p={5} display="flex" flexDirection="row" alignItems="center">
                        <Box>
                            <SelectivesSection />
                        </Box>
                    </Box>
                    <Box my={3} width="100%" mt={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <Button className={classes.startBaigeButton} disabled={!isBought && !isBaigeActive} variant="contained" color="primary">Начать байге</Button>
                    </Box>
                </Box>
                <Box className={classes.card}>
                    <Box pt={3} pb={3}>
                        <Box px={3}>
                            <Typography fontSize="20px">Победители прошлой недели</Typography>
                        </Box>
                        <Box mt={2}>
                        {
                            top.map(({friend, point, prize}) => (
                                <Box key={friend.id} borderBottom="1px solid #CCD4E1" px={4} py={2} display="flex" flexDirection="row" alignItems="center">
                                    <Avatar
                                        style={{width: "50px", height: "50px"}}
                                        src={friend.avatar ?? "a"}
                                    />
                                    <Box ml={2} width="200px">
                                        <Typography fontSize="16px" fontWeight="700px">{friend.fullName}</Typography>
                                        <Typography customVariant="littleTextRoboto" fontWeight="bolder">{friend.username ?? ""}</Typography>
                                    </Box>
                                    <Box ml={10}>
                                        <Typography customVariant="littleTextRoboto" fontWeight="bolder">{prize}</Typography>
                                    </Box>
                                    <Box ml="auto">
                                        <Typography customVariant="bodyRoboto" fontSize="16px" fontWeight="900">{point}</Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.card}>
                    <Box p={3}>
                        <Box mb={2}>
                            <Typography>История:</Typography>
                        </Box>
                        <TableContainer component={Box}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="littleTextRoboto">
                                                Начало
                                            </Typography>
                                            </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="littleTextRoboto">
                                                Длительность
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="littleTextRoboto">
                                                Предметы
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Typography customVariant="littleTextRoboto">
                                                Результаты
                                            </Typography>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((item) => (
                                        <StyledTableRow onClick={onHistoryBaigeClick(item.id)} key={item.id}>
                                            <StyledTableCell component="th" scope="row">
                                                <Typography customVariant="littleTextRoboto">
                                                    {new Date(item.startData).toISOString().substr(0, 10)}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Typography customVariant="littleTextRoboto">
                                                    {new Date(1000 * (item.secElapsed ?? 0)).toISOString().substr(11, 8)}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Typography customVariant="littleTextRoboto">
                                                    {`${item.selective.key}/${item.selective.pair.key}`}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Typography customVariant="littleTextRoboto">
                                                    {item.point}
                                                </Typography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
}

const mapStateToProps = ({ baigePage }) => {
    return {
        baigeData: baigePage.baigeData,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadBaige: () => dispatch(loadBaige()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BaigePage);