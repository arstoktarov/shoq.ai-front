import React, {useState} from 'react';
import {List, ListItem, ListItemText} from "../../mui-customized/Accordion/AccordionList";
import {Box, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";

const useStyles = makeStyles({
    itemNumber: {
        height: '10px',
        width: '10px',
        backgroundColor: '#E8F5FE',
        borderRadius: '50%',
        padding: '5px',
        textAlign: 'center',
        fontSize: '10px',
        marginLeft: '10px',
        marginRight: '15px',
        lineHeight: '10px',
        fontFamily: 'Roboto'
    },
    text: {
        marginRight: '30px',
    },
});

const TopicItem = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const { idx, id, title = "loading...", completed, active, available } = props;

    const onEditClick = (e) => {
        e.stopPropagation();
    }

    const onTopicClick = (e) => {
        if (active || completed) {
            history.push(location.pathname + `/topics/${id}`);
        }
        else {
            enqueueSnackbar('Закончите предыдущие темы.', {variant: "error"});
        }
    }

    const getTopicStatus = () => {
        if (!available) {
            return <LockRoundedIcon fontSize="small" color="action" />
        }
        else if (active) {
            return "";
        }
        else {
            return <DoneRoundedIcon fontSize="small" color={completed ? "primary" : "action"} />
        }
    }

    return (
        <ListItem button disabled={!available} onClick={onTopicClick}>
            <Typography className={classes.itemNumber}>
                {idx + 1}
            </Typography>
            <ListItemText primary={title} className={classes.text} />
            {getTopicStatus()}
        </ListItem>
    );
}

export default TopicItem;