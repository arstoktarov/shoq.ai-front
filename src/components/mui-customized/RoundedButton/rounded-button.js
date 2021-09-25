import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";

const RoundedButton = withStyles((theme) => ({
    root: {
        borderRadius: '30px',
        lineHeight: 1,
        boxShadow: "none",
        textTransform: "none",
    },
    label: {
        fontFamily: "Raleway",
        fontWeight: "600",
        fontSize: "14px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
    },
}))(MuiButton);

export default RoundedButton;