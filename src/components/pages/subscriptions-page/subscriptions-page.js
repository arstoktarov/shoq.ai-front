import React from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import WebSubscriptionsPage from "components/pages/subscriptions-page/web-subscriptions-page/web-subscriptions-page";
import MobileSubscriptionsPage
    from "components/pages/subscriptions-page/mobile-subscriptions-page/mobile-subscriptions-page";


const SubscriptionsPage = (props) => {

    return (
        <React.Fragment>
            <BrowserView>
                <WebSubscriptionsPage />
            </BrowserView>
            <MobileView>
                <MobileSubscriptionsPage />
            </MobileView>
        </React.Fragment>
    );
}

export default SubscriptionsPage;