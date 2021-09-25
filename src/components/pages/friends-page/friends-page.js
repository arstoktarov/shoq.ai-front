import React, {useEffect} from "react";
import MainLayout from "components/layouts/main-layout";
import {Avatar, Box, CircularProgress, IconButton, Paper, Tab as MuiTab, Tabs} from "@material-ui/core";
import Breadcrumb from "components/mui-customized/breadcrumb";
import {withStyles} from "@material-ui/core/styles";
import Typography from "components/mui-customized/Typography";
import RoundedButton from "components/mui-customized/RoundedButton";
import FilledIconButton from "components/mui-customized/FilledIconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {friendRequestAccept, friendRequestReject, loadFriendsList, removeFriend} from "actions/friends-page-actions";
import Backdrop from "components/backdrop";
import DeleteIcon from "@material-ui/icons/Delete";

const Tab = withStyles((theme) => ({
    root: {
        fontWeight: "700",
        textTransform: "none",
        fontSize: "18px",
    },
}))(MuiTab);

const FriendsPage = (props) => {
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const { loadFriends, friendsList, inRequests, loading, acceptFriendRequest, rejectFriendRequest, removeFriend } = props;

    useEffect(() => {
        loadFriends();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onAddFriendClick = () => {
        history.push('/profile/searchFriend');
    }

    const handleAcceptRequestClick = (userId) => () => {
        acceptFriendRequest(userId);
    }

    const handleRejectRequestClick = (userId) => () => {
        rejectFriendRequest(userId);
    }

    const handleRemoveFriendClick = (userId) => () => {
        removeFriend(userId);
    }

    return (
        <MainLayout>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box height="100%" borderRight="1px solid #CCD4E1">
                <Box p={2} display="flex" flexDirection="row" alignItems="center">
                    <Breadcrumb primaryText="Профиль" onClick={() => {history.push('/profile')}}/>
                    <Box ml="auto">
                        <FilledIconButton onClick={onAddFriendClick} color="primary" variant="outlined"><PersonAddIcon /></FilledIconButton>
                    </Box>
                </Box>
                <Box borderBottom="1px solid #CCD4E1">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Друзья" />
                        <Tab label="Запросы в друзья" />
                    </Tabs>
                </Box>
                {
                    value === 0 ?
                        friendsList.map((friend, idx) => (
                            <Box key={friend.id} borderBottom="1px solid #CCD4E1" px={4} py={2} display="flex" flexDirection="row"
                                 alignItems="center">
                                <Avatar
                                    style={{width: "50px", height: "50px"}}
                                    src={friend.avatar}
                                />
                                <Box ml={2}>
                                    <Typography fontSize="14px">{`${friend.fullName}`}</Typography>
                                    <Typography customVariant="subtitleRoboto">@{friend.username}</Typography>
                                </Box>
                                <Box ml="auto" display="flex" flexDirection="row" alignItems="center">
                                    <Box ml="auto">
                                        <IconButton onClick={handleRemoveFriendClick(friend.id)} color="secondary" variant="outlined"><DeleteIcon /></IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    :
                        inRequests.map((request, idx) => (
                            <Box key={request.id} borderBottom="1px solid #CCD4E1" px={4} py={2} display="flex" flexDirection="row"
                                 alignItems="center">
                                <Avatar
                                    style={{width: "50px", height: "50px"}}
                                    src={request.avatar}
                                />
                                <Box ml={2}>
                                    <Typography fontSize="14px">{request.fullName}</Typography>
                                    <Typography customVariant="subtitleRaleway">@{request.username}</Typography>
                                </Box>
                                <Box ml="auto" display="flex" flexDirection="row" alignItems="center">
                                    <RoundedButton onClick={handleRejectRequestClick(request.id)} variant="outlined" color="secondary">Отклонить</RoundedButton>
                                    <Box ml={2}>
                                        <RoundedButton onClick={handleAcceptRequestClick(request.id)} variant="outlined" color="primary">Принять</RoundedButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                }
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ friendsPage }) => {
    return {
        loading: friendsPage.loading,
        error: friendsPage.error,
        friendsList: friendsPage.friendsList,
        inRequests: friendsPage.inRequests,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFriends: () => dispatch(loadFriendsList()),
        acceptFriendRequest: (userId) => dispatch(friendRequestAccept(userId)),
        rejectFriendRequest: (userId) => dispatch(friendRequestReject(userId)),
        removeFriend: (userId) => dispatch(removeFriend(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);