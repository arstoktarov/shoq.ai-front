import React, {useEffect, useState} from "react";
import Header from "components/header/header";
import {Avatar, Box} from "@material-ui/core";

import useStyles from "./styles";
import Typography from "components/mui-customized/Typography";
import OOFTimer from "./oof-timer";
import OOFAvatar from "components/pages/oof-game-page/oof-avatar";
import AnswerItem from "components/pages/topic-page/test-section/answer-item";

const OOFGamePage = () => {
    const classes = useStyles();

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
                        {
                            [1,2,3,4].map((item, idx) => (
                                <AnswerItem selected={idx===1} idx={idx} title="Мен жауабын білем, бірақ айтпайм саған" />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

export default OOFGamePage;