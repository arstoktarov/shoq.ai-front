import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles({
    root: ({right}) => ({
        alignSelf: right ? 'flex-end' : 'flex-start',
        boxShadow: "none",
        background: right ? "#E8F5FE" : "#F7F9FA",
        borderRadius: right ? "20px 0 20px 20px" : "0 20px 20px 20px",
        padding: "10px 15px",
        marginBottom: "20px",
        maxWidth: "60%",
        minWidth: "300px",
        position: "relative"
    })
})

const ChatBox = (props) => {
    const classes = useStyles(props);

    return (
        <Box className={classes.root}>
            {props.children}
        </Box>
    )
}

export default ChatBox;