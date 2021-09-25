import React, {useEffect, useState} from "react";
import Header from "components/header/header";
import {Avatar, Box} from "@material-ui/core";

import Typography from "components/mui-customized/Typography";
import OOFTimer from "./../oof-game-page/oof-timer";
import OOFAvatar from "components/pages/oof-game-page/oof-avatar";
import AnswerItem from "components/pages/topic-page/test-section/answer-item";
import CircleBoundary from "components/circle-boundary";
import {makeStyles} from "@material-ui/core/styles";
import {FlameIcon} from "components/icons/icons";
import {PlayArrowRounded} from "@material-ui/icons";
import ReplayIconRounded from "@material-ui/icons/ReplayRounded";
import ArrowBackIconRounded from "@material-ui/icons/ArrowBackRounded";
import { colors } from "constantValues";

const useStyles = makeStyles({
    root: (props) => ({
        borderRadius: "20px",
        backgroundColor: props.selected ? "#E8F5FE" : "#F7F9FA",
        width: "100%",
        minHeight: "45px",
        marginBottom: "10px",
        color: props.selected ? "#1DA1F2" : "#5B7083",
    }),
    text: (props) => ({
        fontSize: "0.8rem",
        color: props.selected ? "#1DA1F2" : "#5B7083",
        fontWeight: "bold"
    }),
    number: {
        margin: "0 20px",
        backgroundColor: "white",
    },
    doneButton: {
        color: props => props.selected ? "#1da1f2" : "#CCD4E1"
    },
});

const OOFGamePage = () => {
    const classes = useStyles({ selected: true });

    const maxValue = 120;
    const [value, setValue] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(value => value > 0 ? (value - 1) : maxValue);
        }, 1000);
        return () => {
            console.log("clearing interval");
            clearInterval(interval);
        }
    }, []);

    return (
        <Box>
            <Header />
            <Box display="flex" flexDirection="column" alignItems="center" mt={5} mx="auto" zIndex={1} width="60vw" className={classes.body}>
                <Box display="flex" flexDirection="row" alignItems="flex-start">
                    <OOFAvatar label={"Miramar"}/>
                    <OOFTimer value={(value/maxValue) * 100} label={value}/>
                    <OOFAvatar label={"Pecado"}/>
                </Box>
                <Box mt={3} display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography style={{textAlign: "center"}} fontWeight="400" customVariant="bodyRoboto">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the?
                        </Typography>
                    </Box>
                    <Box mt={2} width="100%">
                        <Box className={classes.root} display="flex" flexDirection="row" alignItems="center">
                            <CircleBoundary className={classes.number}>
                                <PlayArrowRounded color="inherit" fontSize="small"/>
                            </CircleBoundary>
                            <Typography className={classes.text}>Реванш</Typography>
                        </Box>
                        <Box className={classes.root} display="flex" flexDirection="row" alignItems="center">
                            <CircleBoundary className={classes.number}>
                                <ReplayIconRounded color="inherit" fontSize="small"/>
                            </CircleBoundary>
                            <Typography className={classes.text}>Переиграть с другим игроком</Typography>
                        </Box>
                        <Box className={classes.root} display="flex" flexDirection="row" alignItems="center">
                            <CircleBoundary className={classes.number}>
                                <ArrowBackIconRounded color="inherit" fontSize="small"/>
                            </CircleBoundary>
                            <Typography className={classes.text}>Завершить игру</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

export default OOFGamePage;