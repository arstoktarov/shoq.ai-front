import {actionTypes} from "../constants";
import {act} from "react-dom/test-utils";

const initialState = {
    friendsList: [],
    inRequests: [],
    searchFriendPage: {
        loading: false,
        list: [],
    },
    sendFriendRequest: {
        list: {},
    },
    loading: true,
    error: false,
    errorMessage: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FRIENDS_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case actionTypes.FRIENDS_LIST_SUCCESS: {
            const { friends, inRequests } = action.payload;
            return {
                ...state,
                loading: false,
                error: false,
                friendsList: friends,
                inRequests: inRequests,
            };
        }
        case actionTypes.FRIENDS_LIST_FAILURE: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload.message,
            };
        }
        case actionTypes.SEARCH_FRIEND_REQUEST: {
            return {
                ...state,
                searchFriendPage: {
                    ...state.searchFriendPage,
                    loading: true,
                }
            }
        }
        case actionTypes.SEARCH_FRIEND_SUCCESS: {
            return {
                ...state,
                searchFriendPage: {
                    ...state.searchFriendPage,
                    loading: false,
                    list: action.payload,
                }
            }
        }
        case actionTypes.SEND_FRIEND_REQUEST: {
            const userId = action.payload;
            console.log(userId);
            const { searchFriendPage: { list } } = state;
            const userIdx = list.findIndex(u => u.id === userId);
            const item = list[userIdx];
            return {
                ...state,
                searchFriendPage: {
                    ...state.searchFriendPage,
                    loading: false,
                    list: [
                        ...state.searchFriendPage.list.slice(0, userIdx),
                        {
                            ...item,
                            friendRequestStatus: "loading",
                        },
                        ...state.searchFriendPage.list.slice(userIdx + 1),
                    ],
                }
            }
        }
        case actionTypes.SEND_FRIEND_REQUEST_SUCCESS: {
            const userId = action.payload;
            const { searchFriendPage: { list } } = state;
            const userIdx = list.findIndex(u => u.id === userId);
            const item = list.find(u => u.id === userId);
            return {
                ...state,
                searchFriendPage: {
                    ...state.searchFriendPage,
                    loading: false,
                    list: [
                        ...state.searchFriendPage.list.slice(0, userIdx),
                        {
                            ...item,
                            friendRequestStatus: "success",
                        },
                        ...state.searchFriendPage.list.slice(userIdx + 1),
                    ],
                }
            }
        }
        default:
            return state;
    }
}