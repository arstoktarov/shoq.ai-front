import React, {useState} from "react";
import MainLayout from "components/layouts/main-layout";
import {Avatar, Box, CircularProgress, InputBase} from "@material-ui/core";
import Breadcrumb from "components/mui-customized/breadcrumb";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "components/mui-customized/Typography";
import RoundedButton from "components/mui-customized/RoundedButton";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {connect} from "react-redux";
import {friendRequestAccept, friendRequestReject, searchFriend, sendFriendRequest} from "actions/friends-page-actions";
import FilledIconButton from "components/mui-customized/FilledIconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    input: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const SearchFriendPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { searchFriend, loading, list, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, } = props;

    const [value, setValue] = useState("");


    const handleChange = (e) => {
        if (e.target.value !== value) {
            setValue(e.target.value);
            if (e.target.value !== "") {
                searchFriend(e.target.value);
            }
        }
    }

    const handleAcceptRequestClick = (userId) => () => {
        acceptFriendRequest(userId);
    }

    const handleRejectRequestClick = (userId) => () => {
        rejectFriendRequest(userId);
    }

    const handleSendRequestClick = (userId) => () => {
        sendFriendRequest(userId);
    }

    const getRenderByFriendStatus = (user) => {
        const { friendRequestStatus, friendStatus } = user;
        switch (friendRequestStatus) {
            case "loading": {
                return (
                    <CircularProgress/>
                );
            }
            case "success": {
                return "";
            }
            default: {
                switch (friendStatus) {
                    case "": {
                        return (
                            <FilledIconButton onClick={handleSendRequestClick(user.id)} color="primary" variant="outlined"><PersonAddIcon/></FilledIconButton>
                        )
                    }
                    case "reqInFriend": {
                        return "";
                    }
                    case "reqOutFriend": {
                        return "";
                    }
                    case "isFriend": {
                        return "";
                    }
                }
            }
        }
    }

    return (
        <MainLayout>
            <Box height="100%" borderRight="1px solid #CCD4E1">
                <Box p={2} display="flex" flexDirection="row" alignItems="center">
                    <Breadcrumb onClick={() => {history.push('/profile/friends')}} primaryText="Друзья"/>
                </Box>
                <Box px={2} borderTop="1px solid #CCD4E1" borderBottom="1px solid #CCD4E1" display="flex" flexDirection="row" alignItems="center">
                    <SearchRoundedIcon color="primary"/>
                    <Box width="100%" ml={2}>
                        <InputBase
                            value={value}
                            onChange={handleChange}
                            className={classes.input}
                            fullWidth
                            placeholder="Поиск друзей"
                        />
                    </Box>
                </Box>
                <Box>
                    {
                        list.map((item, idx) => (
                            <Box key={item.id} borderBottom="1px solid #CCD4E1" px={4} py={2} display="flex" flexDirection="row"
                                 alignItems="center">
                                <Avatar
                                    style={{width: "50px", height: "50px"}}
                                    src={item.avatar}
                                />
                                <Box ml={2}>
                                    <Typography fontSize="14px">{item.fullName}</Typography>
                                    <Typography customVariant="subtitleRaleway">@{item.username}</Typography>
                                </Box>
                                <Box ml="auto" display="flex" flexDirection="row" alignItems="center">
                                    {
                                        getRenderByFriendStatus(item)
                                    }
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ friendsPage: { searchFriendPage } }) => {
    return {
        loading: searchFriendPage.loading,
        list: searchFriendPage.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchFriend: (name) => dispatch(searchFriend(name)),
        sendFriendRequest: payload => dispatch(sendFriendRequest(payload)),
        acceptFriendRequest: (userId) => dispatch(friendRequestAccept(userId)),
        rejectFriendRequest: (userId) => dispatch(friendRequestReject(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriendPage);