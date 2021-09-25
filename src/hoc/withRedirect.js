import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {connect} from "react-redux";

const withRedirect = () => (Wrapped) => {
    return (props) => {
        const history = useHistory();
        const location = useLocation();
        const { redirectTo } = props;
        if (redirectTo && redirectTo !== location.pathname) {
            history.push(redirectTo);
        }
        return (<Wrapped {...props} />);
    }
}

export default withRedirect;