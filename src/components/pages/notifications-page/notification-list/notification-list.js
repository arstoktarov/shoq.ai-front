import React from 'react';
import {Box} from "@material-ui/core";
import NotificationSection from "../notification-section";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#F7F9FA",
    },
})

const NotificationList = (props) => {
    const classes = useStyles();

    const { items, onItemClick } = props;

    return (
        <Box className={classes.root}>
            {
                <Box>
                    {
                        items.map((item, idx) => (
                            <NotificationSection onItemClick={onItemClick} item={item} idx={idx} key={idx}/>
                        ))
                    }
                </Box>
            }
        </Box>
    );

};

export default NotificationList;