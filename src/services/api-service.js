import axios from "axios";
import {checkStatusCode, HttpStatusException} from "../http-error-handler";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {

    static baseUrl = "https://shoq.ai:4001";


    static get instance() {
        // Try to get an efficient singleton
        if (!this[singleton]) {
            console.log("Api Service Singleton created");
            this[singleton] = new ApiService(singletonEnforcer);
        }

        return this[singleton];
    }

    constructor(enforcer) {

        this.session = axios.create({
            withCredentials: true,
            baseURL: ApiService.baseUrl,
        });

        this.session.defaults.headers.common['User-Agent-Device'] = `w`;

        this.addResponseLogger();
        this.addRequestLogger();
        this.addResponseExceptionHandler();
    }

    addRequestLogger = () => {
        this.session.interceptors.request.use((request) => {
            console.log("%cAPI: REQUEST", "color:orange", request);
            return request;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    addResponseLogger = () => {
        this.session.interceptors.response.use((response) => {
            console.log("%cAPI: RESPONSE", "color:lightgreen", response);
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    addResponseExceptionHandler = () => {
        this.session.interceptors.response.use((response) => {
            const { data: { statusCode, data } } = response;

            if (!checkStatusCode(statusCode)) {
                throw new HttpStatusException(statusCode);
            }

            return response;

        }, (error) => {
            return Promise.reject(error);
        });
    }

    setHeader = (key, value) => {
        this.session.defaults.headers.common[key] = value;
    }

    setAccessToken = (access_token) => {
        this.session.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }

    login = async (number, password) => {
        const { data } = await this.session.post(`/unauthed/signin`, {
            'number': number,
            'password': password,
        });
        return data;
    }

    loginWithUsername = async (username, password) => {
        const { data } = await this.session.post(`/unauthed/signinu`, {
            'username': username,
            'password': password,
        });
        return data;
    }

    register = async (username, password, number) => {
        const { data } = await this.session.post(`/unauthed/signup`, {
            'username': username,
            'password': password,
            'number': number,
        });
        return data;
    }

    verify = async (verificationId, code) => {
        const { data } = await this.session.post(`/unauthed/signup_verification`, {
            'verificationId': verificationId,
            'smsCode': code,
        });
        return data;
    }

    verifyResend = async (verificationId) => {
        const { data } = await this.session.post(`/unauthed/verification_resend`, {
            'verificationId': verificationId,
        });
        return data;
    }

    recovery = async (number) => {
        const { data } = await this.session.post(`/unauthed/recovery`, {
            'number': number,
        });
        return data;
    }

    recoveryVerify = async (verificationId, code) => {
        const { data } = await this.session.post(`/unauthed/recovery_verification`, {
            'verificationId': verificationId,
            'smsCode': code,
        });
        return data;
    }

    recoveryVerifyResend = async (verificationId) => {
        const { data } = await this.session.post(`/unauthed/recovery_verification_resend`, {
            'verificationId': verificationId,
        });
        return data;
    }

    resetPassword = async (verificationId, password) => {
        const { data } = await this.session.post(`/unauthed/recovery_setpassword`, {
            'verificationId': verificationId,
            'password': password,
        });
        return data;
    }

    refreshToken = async () => {
        return await this.session.post(`/unauthed/refreshtoken`, {});
    }

    getSubjects = async () => {
        const { data } = await this.session.get(`/authed/mycourses/`);
        return data;
    }

    getSubject = async (subjectId) => {
        const { data } = await this.session.get(`/authed/mycourses/${subjectId}`);
        return data;
    }

    getTopic = async (topicId) => {
        const { data } = await this.session.get(`/authed/mycourses/web/topic/${topicId}`);
        return data;
    }

    addTestResult = async (topicId, correctCount) => {
        const { data } = await this.session.post(`/authed/mycourses/topic/${topicId}/test/answer`, {
            correctCount: correctCount,
        });
        return data;
    }

    completeVideo = async (topicId) => {
        const { data } = await this.session.get(`/authed/mycourses/topic/${topicId}/video/complete`);
        return data;
    }

    addMessage = async (topicId, replyTo, message, image) => {
        const formData = new FormData();
        formData.append("replyTo", replyTo);
        formData.append("answerMessage", message);
        formData.append("answerImage", image);
        const { data } = await this.session.post(`/authed/mycourses/topic/${topicId}/conversation/message`, formData);
        return data;
    }

    me = async () => {
        const { data } = await this.session.get('authed/me');
        return data;
    }

    editProfile = async ({ firstName, secondName, username, password, parentNumber, avatar }) => {
        const formData = new FormData();
        if (firstName && firstName !== "") formData.append("firstName", firstName);
        if (secondName && secondName !== "") formData.append("secondName", secondName);
        if (username && username !== "") formData.append("username", username);
        if (password && password !== "") formData.append("password", password);
        if (parentNumber && parentNumber !== "") formData.append("parentNumber", parentNumber);
        if (avatar && avatar !== "") formData.append("image", avatar);
        const { data } = await this.session.post("/authed/profile/change", formData);
        return data;
    }

    myFriends = async () => {
        const { data } = await this.session.get('authed/profile/friends');
        return data;
    }

    acceptFriendRequest = async (userId) => {
        const { data } = await this.session.post('/authed/profile/friends/acceptRequest', {
            id: userId,
        });
        return data;
    }

    rejectFriendRequest = async (userId) => {
        const { data } = await this.session.post('/authed/profile/friends/rejectRequest', {
            id: userId
        });
        return data;
    }

    sendFriendRequest = async (userId) => {
        const { data } = await this.session.post('/authed/profile/friends/sendRequest', {
            id: userId,
        });
        return data;
    }

    findPerson = async (name) => {
        const { data } = await this.session.post('/authed/profile/findPerson', {
            name,
        });
        return data;
    }

    removeFriend = async (userId) => {
        const { data } = await this.session.post('/authed/profile/friends/removeFriend', {
            id: userId
        });
        return data;
    }

    getSelectives = async () => {
        const { data } = await this.session.get('/authed/selectives/get');
        return data;
    }

    getSelectivesUnauthed = async () => {
        const { data } = await this.session.get('/unauthed/selectives/get');
        return data;
    }

    setSelectives = async (selectiveFirst, selectiveSecond) => {
        const { data } = await this.session.post('/authed/selectives/set', {
            selectiveFirst,
            selectiveSecond
        });
        return data;
    }

    getTrialPage = async () => {
        const { data } = await this.session.get('/authed/trail/');
        return data;
    }

    startTrial = async () => {
        const { data } = await this.session.get('/authed/trail/trail_initial');
        return data;
    }

    trialContinue = async () => {
        const { data } = await this.session.get('/authed/trail/trail_continue');
        return data;
    }

    getTrialById = async (trialId) => {
        const { data } = await this.session.get(`/authed/trail/trail_get/${trialId}`);
        return data;
    }

    trailRunning = async (trialId, moveTo, questionResultData) => {
        const { data } = await this.session.post('/authed/trail/trail_running', {
            trailId: trialId,
            moveTo,
            questionResultData,
        });
        return data;
    }

    trialEnded = async (trialId, moveTo, questionResultData) => {
        const { data } = await this.session.post('/authed/trail/trail_ended', {
            trailId: trialId,
            moveTo,
            questionResultData,
        });
        return data;
    }

    trialFinal = async (trialId, mode, questionResultData) => {
        const { data } = await this.session.post('/authed/trail/trail_final', {
            trailId: trialId,
            mode,
            questionResultData,
        });
        return data;
    }

    getNotifications = async (page) => {
        const { data: requestData } = await this.session.post('/authed/profile/notifications', {
            page
        });
        console.log(requestData);
        const { data: {currentPage, totalPages, notifications} } = requestData;

        const reducedNotifications = notifications.reduce((messages, notification) => {
            const date = notification.time.split('T')[0];
            if (!messages[date]) {
                messages[date] = [];
            }
            messages[date].push(notification);
            return messages;
        }, {});
        const mappedNotifications = Object.keys(reducedNotifications).map((date) => {
            return {
                date,
                notifications: reducedNotifications[date],
            };
        });

        return {
            ...requestData,
            data:
            {
                ...requestData.data,
                notifications: mappedNotifications,
            }
        };
    }

    getPriceList = async () => {
        const { data } = await this.session.get('/unauthed/payment/priceList');
        return data;
    }

    buyPackage = async ({ userId, packageType, optionType, priceId, subjectGlobalIds, language }) => {
        const { data } = await this.session.post('/unauthed/payment/buy', {
            userId, packageType, optionType, priceId, subjectGlobalIds, language
        });
        return data;
    }

    regions = async () => {
        const { data } = await this.session.get('/authed/univer/region_list');
        return data;
    }

    univerList = async (page = 1, regionIds = [], search = "") => {
        const { data } = await this.session.post('/authed/univer/univer_list', {
            page,
            regionIds,
            search
        });
        return data;
    }

    majorList = async (page = 1, search = '') => {
        const { data } = await this.session.post('/authed/univer/major_list', {
            page,
            search
        });
        return data;
    }

    supportAvailableRefresh = async (userId) => {
        const { data } = await this.session.post('/unauthed/payment/supportAvailable', {
            id: userId
        });
        return data;
    }

    supportWrite = async ({ studentId, name, content, number }) => {
        const { data } = await this.session.post('/unauthed/payment/supportWrite', {
            studentId, name, content, number
        });
        return data;
    }

    kaspiAvailableRefresh = async (userId) => {
        const { data } = await this.session.post('/unauthed/payment/kaspiAvailable', {
            id: userId
        });
        return data;
    }

    kaspiWrite = async ({ studentId, name, content, number }) => {
        const { data } = await this.session.post('/unauthed/payment/kaspiWrite', {
            studentId, name, content, number
        });
        return data;
    }
}

export default ApiService.instance;