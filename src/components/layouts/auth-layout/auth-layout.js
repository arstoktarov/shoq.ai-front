import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import ReactCodeInput from "react-code-input";
import {colors} from "constantValues";
import LoginSvgImage from "svg/login-image.svg";
import useStyles from "./styles";


export default function AuthLayout(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.form}>
                {props.children}
            </Box>
            <Box
                overflow="hidden"
                height="100%"
                position="absolute"
                display="flex"
                alignItems="center"
                top="0"
                right="0"
                zIndex="1"
            >
                <img src={LoginSvgImage} width="100%" height="100%" alt="Image"/>
            </Box>
        </Box>
    );
}