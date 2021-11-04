import { actionTypes } from '../constants'
import apiService from "services/api-service";
import {userSuccess} from "actions/user-actions";

export const requestAccessToken = () => {
    return (dispatch, getState) => {
        dispatch(authRequest());

        const { auth: { access_token, access_token_expiry } } = getState();

        if (access_token) {
            dispatch(authSuccess({ access_token, access_token_expiry }));
        }

        apiService.refreshToken()
            .then(({ data: { data } }) => {
                if (data) {
                    dispatch(authFailure());
                    return;
                }
                if (!data.AccessToken) {
                    dispatch(authFailure());
                    return;
                }

                const { AccessToken: access_token, AtExpires: access_token_expiry } = data;

                apiService.setAccessToken(access_token);

                dispatch(authSuccess({ access_token, access_token_expiry }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFailure(error));
            })
    }
}

export const checkAuth = () => {
    return async (dispatch, getState) => {
        dispatch(authRequest());
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            dispatch(authFailure());
        }
        else {
            apiService.setAccessToken(access_token);
            try {
                const res = await apiService.me();
                console.log("me result", res);
                dispatch(userSuccess(res.data));
                dispatch(authSuccess());
            }
            catch (e) {
                console.log("me result", e);
                dispatch(authFailure({
                    errorMessage: "Вы вошли с другого устройства"
                }));
            }
        }
    }
}

export const requestRegister = (fullname, username, password, phone, grade) => {
    return async (dispatch) => {
        dispatch(registerRequest());
        try {
            const {data} = await apiService.register(username, password, phone)
            const {verificationId} = data;
            console.log(verificationId);
            dispatch(registerSuccess(verificationId));
        }
        catch (e) {
            dispatch(registerFailure(e.message));
        }
    }
}

export const requestRecovery = (number) => {
    return async (dispatch) => {
        dispatch(recoveryRequest());
        const { data } = await apiService.recovery(number);
        const { verificationId } = data;
        dispatch(recoverySuccess(verificationId));
    }
}

export const recoveryVerification = (recoveryId, code) => {
    return async (dispatch) => {
        dispatch(recoveryVerificationRequest());
        const { data } = await apiService.recoveryVerify(recoveryId, code);
        const { verificationId } = data;
        dispatch(recoveryVerificationSuccess(verificationId));
    }
}

export const authRequest = (payload) => {
    return {
        type: actionTypes.AUTH_REQUEST,
        payload,
    }
}

export const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload
    }
}

export const authFailure = (payload) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        payload
    }
}

export const recoveryRequest = () => {
    return {
        type: actionTypes.RECOVERY_REQUEST,
    }
}

export const recoveryVerificationRequest = () => {
    return {
        type: actionTypes.RECOVERY_VERIFICATION_REQUEST,
    }
}

export const recoveryVerificationSuccess = (payload) => {
    return {
        type: actionTypes.RECOVERY_VERIFICATION_SUCCESS,
        payload,
    }
}

export const recoveryVerificationFailure = (payload) => {
    return {
        type: actionTypes.RECOVERY_VERIFICATION_FAILURE,
        payload,
    }
}

export const recoverySuccess = (payload) => {
    return {
        type: actionTypes.RECOVERY_SUCCESS,
        payload,
    }
}

export const registerRequest = (payload) => {
    return {
        type: actionTypes.REGISTER_REQUEST,
        payload,
    }
}

export const registerSuccess = (payload) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload,
    }
}

export const registerFailure = (payload) => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        payload,
    }
}