import apiService from "services/api-service";
import {actionTypes} from "constantValues";

export const loadFriendsList = () => async (dispatch) => {
    dispatch(friendsListRequest());
    try {
        const { data } = await apiService.myFriends();
        dispatch(friendsListSuccess(data));
    }
    catch (e) {
        dispatch(friendsListFailure(e));
    }
}

export const removeFriend = (userId) => async (dispatch) => {
    dispatch(friendsListRequest());
    try {
        await apiService.removeFriend(userId);
        const { data } = await apiService.myFriends();
        dispatch(friendsListSuccess(data));
    }
    catch (e) {
        dispatch(friendsListFailure(e));
    }
}

export const friendRequestAccept = (userId) => async (dispatch) => {
    dispatch(friendsListRequest());
    try {
        await apiService.acceptFriendRequest(userId);
        const { data } = await apiService.myFriends();
        dispatch(friendsListSuccess(data));
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

export const friendRequestReject = (userId) => async (dispatch) => {
    dispatch(friendsListRequest());
    try {
        await apiService.rejectFriendRequest(userId);
        const { data } = await apiService.myFriends();
        dispatch(friendsListSuccess(data));
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

export const searchFriend = (name) => async (dispatch) => {
    dispatch(searchFriendRequest());
    try {
        const { data } = await apiService.findPerson(name);
        dispatch(searchFriendSuccess(data));
    }
    catch (e) {
        console.error(e);
    }
}

export const sendFriendRequest = (userId) => async (dispatch) => {
    dispatch(sendFriendRequestLoading(userId));
    try {
        const { data } = await apiService.sendFriendRequest(userId);
        dispatch(sendFriendRequestSuccess(userId));
    }
    catch (e) {
        dispatch(sendFriendRequestSuccess(userId));
    }
}


export const searchFriendRequest = () => ({
    type: actionTypes.SEARCH_FRIEND_REQUEST,
});

export const searchFriendSuccess = payload => ({
    type: actionTypes.SEARCH_FRIEND_SUCCESS,
    payload,
});

export const friendsListRequest = () => ({
    type: actionTypes.FRIENDS_LIST_REQUEST,
});

export const friendsListSuccess = payload => ({
    type: actionTypes.FRIENDS_LIST_SUCCESS,
    payload
});

export const friendsListFailure = payload => ({
    type: actionTypes.FRIENDS_LIST_FAILURE,
    payload,
});

export const sendFriendRequestLoading = payload => ({
    type: actionTypes.SEND_FRIEND_REQUEST,
    payload,
});

export const sendFriendRequestSuccess = payload => ({
    type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS,
    payload,
});