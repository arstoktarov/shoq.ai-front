import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const ChatUsername = withStyles({
    root: {
        fontSize: '1rem',
        fontWeight: "bolder",
        color: '#5B7083'
    }
})
(Typography);

export default ChatUsername;