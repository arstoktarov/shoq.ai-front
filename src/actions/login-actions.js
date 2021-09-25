import { actionTypes } from '../constants'
import apiService from "services/api-service";

export const login = (number, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await apiService.login(number, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
            localStorage.setItem('access_token', response.data.token);
            dispatch(loginSuccess());
        }
        catch (e) {
            dispatch(loginFailure(e.message));
            console.error(e);
        }
    }
}

export const loginWithUsername = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await apiService.loginWithUsername(username, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('access_token', response.data.token);
            history.push('/');
        }
        catch (e) {
            console.error(e);
            dispatch(authFailure(e.message));
        }
    }
}

export const loginRequest = (payload) => {
    return {
        type: actionTypes.LOGIN_REQUEST,
        payload,
    }
}

export const loginSuccess = (payload) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload
    }
}

export const loginFailure = (payload) => {
    return {
        type: actionTypes.LOGIN_FAILURE,
        payload
    }
}