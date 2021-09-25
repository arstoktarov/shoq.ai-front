import React, {useEffect} from 'react';
import {Route, Redirect, useHistory} from "react-router-dom";
import { withAuthService } from '../hoc';
import {checkAuth, requestAccessToken} from "../../actions";
import {connect} from "react-redux";
import AppLoadingBar from "../app-loading-bar";

const PrivateRoute = ({ component: Component, ...props }) => {
    const history = useHistory();

    const { loading, isAuthenticated, checkAuth } = props;
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) return <AppLoadingBar />

    if (!isAuthenticated) history.push('/login');

    return (
        <Route
            {...props}
            component={Component}
        />
    )

}

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        error: auth.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(checkAuth()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);