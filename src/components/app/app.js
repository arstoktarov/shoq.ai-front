import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { MuiThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "../themes/default-theme";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {ApiServiceProvider} from "../api-service-context";
import apiService from "services/api-service";
import DateFnsUtils from '@date-io/date-fns';
import { requestAccessToken } from "actions";
import {connect} from "react-redux";

import SubjectPage from "components/pages/subject-page";
import TopicPage from "components/pages/topic-page";
import TrialPage from "components/pages/trial-page";
import LoginPage from "components/pages/login-page";
import RegisterPage from "components/pages/register-page";
import PasswordRecoveryPage from "components/pages/password-recovery-page";
import SubjectsPage from "components/pages/subjects-page";
import CheckCodePage from "components/pages/check-code-page";
import TrialTestPage from "components/pages/trial-test-page";
import OOFPage from "components/pages/oof-page";
import OOFGamePage from "components/pages/oof-game-page";
import ProfilePage from "components/pages/profile-page";
import FriendsPage from "components/pages/friends-page";
import SearchFriendPage from "components/pages/search-friend-page";
import OOFGameResultPage from "components/pages/oof-game-result-page/oof-game-result-page";
import PrivateRoute from "components/private-route/private-route";
import CheckRecoveryCode from "components/pages/check-recovery-code/check-recovery-code";
import ResetPasswordPage from "components/pages/reset-password-page";
import UsernameLoginPage from "components/pages/login-page/username-login-page";
import {loadUser} from "actions/user-actions";
import {Backdrop, CircularProgress} from "@material-ui/core";
import TrialTestResult from "components/pages/trial-test-page/trial-test-result";
import NotificationsPage from "components/pages/notifications-page";
import SubscriptionsPage from "components/pages/subscriptions-page";
import MobileSubscriptionsPage from "components/pages/mobile-subscriptions-page";

class App extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        return (
            <ApiServiceProvider value={apiService}>
                <MuiThemeProvider theme={defaultTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Backdrop style={{zIndex: 99999}} open={this.props.loading}>
                            <CircularProgress />
                        </Backdrop>
                        <Switch>
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/usernameLogin" component={UsernameLoginPage} />
                            <Route exact path="/register" component={RegisterPage} />
                            <Route exact path="/recovery" component={PasswordRecoveryPage} />
                            <Route exact path="/recoveryCode" component={CheckRecoveryCode} />
                            <Route exact path="/resetPassword" component={ResetPasswordPage} />
                            <Route exact path="/code" component={CheckCodePage} />
                            <Route exact path="/subscriptions" component={MobileSubscriptionsPage} />

                            <PrivateRoute exact path="/" render={() => (<Redirect to="/subjects"/>)} />
                            <PrivateRoute exact path="/subjects" component={SubjectsPage} />
                            <PrivateRoute exact path="/subjects/:subjectId" component={SubjectPage} />
                            <PrivateRoute exact path="/subjects/:subjectId/topics/:topicId" component={TopicPage} />
                            <PrivateRoute exact path="/topics/:topicId" component={TopicPage} />
                            <PrivateRoute exact path="/subject" component={SubjectPage} />
                            <PrivateRoute exact path="/topic" component={TopicPage} />
                            <PrivateRoute exact path="/trial" component={TrialPage} />
                            <PrivateRoute exact path="/trial/test" component={TrialTestPage} />
                            <PrivateRoute exact path="/trial/test/result" component={TrialTestResult} />
                            <PrivateRoute exact path="/oof" component={OOFPage} />
                            <PrivateRoute exact path="/game" component={OOFGamePage} />
                            <PrivateRoute exact path="/gameResult" component={OOFGameResultPage} />
                            <PrivateRoute exact path="/profile" component={ProfilePage} />
                            <PrivateRoute exact path="/profile/friends" component={FriendsPage} />
                            <PrivateRoute exact path="/profile/searchFriend" component={SearchFriendPage} />
                            <PrivateRoute exact path="/notifications" component={NotificationsPage} />
                        </Switch>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </ApiServiceProvider>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    loading: user.loading,
})

const mapDispatchToProps = (dispatch) => {
    return {
        refreshToken: () => dispatch(requestAccessToken()),
        loadUser: () => dispatch(loadUser()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);