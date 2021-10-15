import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import subjectListReducer from "./subject-list-reducer";
import subjectReducer from "./subject-reducer";
import loginReducer from "./login-reducer";
import recoveryReducer from "./recovery-reducer";
import registerReducer from "./register-reducer";
import topicReducer from "./topic-reducer";
import topicTestReducer from "./topic-test-reducer";
import taskReducer from "./task-reducer";
import profileReducer from "./profile-reducer";
import friendsPageReducer from "./friends-page-reducer";
import trialInitialPageReducer from "./trial-initial-page-reducer";
import trialTestReducer from "./trial-test-reducer";
import userReducer from "./user-reducer";
import OOFPageReducer from "./oof-page-reducer";
import notificationsPageReducer from "./notifications-page-reducer";
import subscriptionsPageReducer from "./subscriptions-page-reducer";
import selectivesReducer from "./selectives-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    login: loginReducer,
    recovery: recoveryReducer,
    register: registerReducer,
    subject: subjectReducer,
    subjectList: subjectListReducer,
    topic: topicReducer,
    topicTest: topicTestReducer,
    task: taskReducer,
    profile: profileReducer,
    friendsPage: friendsPageReducer,
    selectivesReducer:  selectivesReducer,
    trialInitialPage: trialInitialPageReducer,
    trialTest: trialTestReducer,
    OOFPage: OOFPageReducer,
    notificationsPage: notificationsPageReducer,
    subscriptionsPage: subscriptionsPageReducer,
});

export default rootReducer;