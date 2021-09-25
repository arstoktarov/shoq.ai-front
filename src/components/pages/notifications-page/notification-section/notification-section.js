import React from 'react';
import NotificationItem from "../notification-item";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "components/mui-customized/Typography";

const useStyles = makeStyles({
    root: {
        borderTop: "1px solid #CCD4E1",
        backgroundColor: "#FFFFFF",
    },
})

const NotificationSection = (props) => {
    const classes = useStyles();
    const { item, onItemClick } = props;

    const getFullDateString = (date) => {
        const options = {
            dateStyle: "full",
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    return (
        <Box mb={1} key={props.idx} className={classes.root}>
            <Box mt={2} mb={1} display="flex" flexDirection="row" justifyContent="center">
                <Typography customVariant="subtitleRoboto" color="textSecondary">{getFullDateString(new Date(item.date))}</Typography>
            </Box>
            {
                item.notifications.map((item, idx) => (
                    <NotificationItem item={item} key={idx} onClick={onItemClick}/>
                ))
            }
        </Box>
    );

}

export default NotificationSection;