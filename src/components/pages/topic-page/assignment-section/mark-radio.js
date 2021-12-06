import React from 'react';
import CircleBoundary from "components/circle-boundary";
import {Box, Typography} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles(({ selected }) => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: ({selected}) => selected ? "#1DA1F2" : "white",
            color: ( {selected} ) => selected ? "white" : "#5B7083",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
            padding: "3px 12px 1px 12px",
            borderRadius: "50px",
            //marginRight: "10px",
            cursor: "default",
            userSelect: "none",
        }
    };
});

const MarkRadio = (props) => {
    const classes = useStyles(props);

    const { label } = props;

    return (
        <CircleBoundary {...props} className={classes.root}>
            <Typography style={{fontFamily: "Roboto", fontWeight: "500"}}>{label}</Typography>
        </CircleBoundary>
    );

}


export default MarkRadio;