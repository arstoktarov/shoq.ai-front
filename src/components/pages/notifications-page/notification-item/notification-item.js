import React from 'react';
import {Avatar, Box, ButtonBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import Typography from "components/mui-customized/Typography";
import NotificationsIcon from '@material-ui/icons/Notifications';
import helpers from "../../../../helpers";

const useStyles = makeStyles((theme) => ({
    buttonBase: (props) => ({
        backgroundColor: !props.item.isRead ? "#ebebeb" : "",
        textAlign: "start",
        width: "100%",
    }),
    avatar: {
        width: "50px",
        height: "50px",
    },
}));

const NotificationItem = (props) => {
    const classes = useStyles(props);
    const history = useHistory();

    const { item, onClick } = props;

    const onItemClick = () => {
        onClick(item);
    }

    return (
        <ButtonBase className={classes.buttonBase} onClick={onItemClick}>
            <Box width="100%" display="flex" flexDirection="row" p={1} borderBottom="1px solid #CCD4E1">
                <Box p={1} display="flex" alignItems="flex-start">
                    <Avatar
                        className={classes.avatar}
                        alt="Remy Sharp"
                        src={item.icon}
                    >
                    </Avatar>
                </Box>
                    <Box ml={1} py={1} color="black">
                        <Typography color="inherit" variant="subtitleRoboto" fontSize="16px">
                            {/*<span style={{fontWeight: "lighter"}}>*/}
                            {/*    {item.topic}*/}
                            {/*</span>*/}
                            <span dangerouslySetInnerHTML={{__html: helpers.replaceMtag(item?.topic ?? "")}}>
                            </span>
                        </Typography>
                        <Box mt={0.5}>
                            <Typography customVariant="subtitleRoboto" color="textSecondary">
                                <span dangerouslySetInnerHTML={{__html: helpers.replaceMtag(item?.message ?? "")}}>
                                </span>
                            </Typography>
                        </Box>
                    </Box>
            </Box>
        </ButtonBase>
    );

}

export default NotificationItem;