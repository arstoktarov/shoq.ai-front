import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { Backdrop as MuiBackdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Backdrop(props) {
    const classes = useStyles();

    return <MuiBackdrop className={classes.backdrop} {...props}/>

}