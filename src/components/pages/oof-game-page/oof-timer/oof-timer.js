import React from "react";
import {Box} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import CircularTimer from "components/oof/circular-timer";
import useStyles from "./styles";

const OOFTimer = (props) => {
    const classes = useStyles();
    const { value, label } = props;

    return (
        <Box className={classes.root} width="300px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                <Box
                    right="70px"
                    width="72px"
                    height="38px"
                    position="absolute"
                    bgcolor="#F7F9FA"
                    borderRadius="10px 10px 10px 10px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography fontSize="22px" color="textSecondary" customVariant="bodyRoboto">008</Typography>
                </Box>
                <CircularTimer value={value} label={label}/>
                <Box
                    left="70px"
                    width="72px"
                    height="38px"
                    position="absolute"
                    bgcolor="#F7F9FA"
                    borderRadius="10px 10px 10px 10px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography fontSize="22px" color="textSecondary" customVariant="bodyRoboto">010</Typography>
                </Box>
            </Box>
            <Box mt={2}><Typography color="textSecondary">vs</Typography></Box>
        </Box>
    );


}

export default OOFTimer;