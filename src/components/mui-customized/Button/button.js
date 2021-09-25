import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";

const Button = withStyles((theme) => ({
    root: {
        borderRadius: '10px',
        lineHeight: 1,
        boxShadow: "none",
        textTransform: "none",
    },
    label: {
        fontFamily: "Raleway",
        fontWeight: "600",
        fontSize: "14px",
    },
}))(MuiButton);

export default Button;