import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((props) => {
    {
        return {
            root: {
                display: "flex",
                padding: "6px 6px 6px 6px",
                flexWrap: "wrap",
                boxSizing: "border-box",
                lineHeight: "1",
                borderRadius: "30px",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
            },
        }
    }
});

export default function CircleBoundary(props) {
    const classes = useStyles({selected: props.selected});

    return (
        <Box {...props} className={`${classes.root} ${props.className}`}>
            {props.children}
        </Box>
    );

}