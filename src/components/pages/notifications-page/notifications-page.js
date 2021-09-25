import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";
import MainLayout from "components/layouts/main-layout";
import Breadcrumb from "components/mui-customized/breadcrumb";
import NotificationList from "components/pages/notifications-page/notification-list";
import {Pagination} from "@material-ui/lab";
import {connect} from "react-redux";
import {loadNotifications} from "actions/notification-actions";

const NotificationsPage = (props) => {
    const [page, setPage] = useState(1);

    const { loadNotifications, notifications = [], totalPages } = props;

    console.log(notifications);

    useEffect(() => {
        loadNotifications(page);
    }, [page]);

    const onPageChange = (e, v) => {
        setPage(v);
    }

    const onNotificationClick = (item) => {

    }

    return (
        <MainLayout>
            <Box width="800px">
                <Breadcrumb height="55px" primaryText="Физика" onClick={() => {history.goBack()}}/>
                {props.loading ? '' : <NotificationList onItemClick={onNotificationClick} items={notifications}/>}
                <Box mt={5} display="flex" flexDirection="column" alignItems="center" width="100%" height="50px">
                    <Pagination
                        onChange={onPageChange}
                        page={page}
                        count={totalPages}
                        style={{fontFamily: "Arial"}}
                        size="large"
                        color="primary"
                    />
                </Box>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ notificationsPage: { loading, data: { totalPages, currentPage, notifications } } }) => ({
    loading, totalPages, currentPage, notifications
});

const mapDispatchToProps = (dispatch) => ({
    loadNotifications: (payload) => dispatch(loadNotifications(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);