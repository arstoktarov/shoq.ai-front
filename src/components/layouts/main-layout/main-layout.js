import React from 'react';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Header from "components/header";
import Menu from "components/menu";
import {ListItemLink} from "components/menu/List";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {ExamIcon, ProfileIcon, GiftIcon} from "components/icons";
import {CoursesIcon} from "components/icons/icons";
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import {connect} from "react-redux";

const useStyles = makeStyles({
    mainLayout: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 7fr 7fr 2fr",
        gridTemplateAreas: `
            "header header header header header"
            "empty_left sidebar main main empty_right"
        `,
        "&::after": {
            backgroundColor: "blue",
            gridRow: 1,
            zIndex: 10,
        }
    }
});

const MainLayout = (props) => {
    const classes = useStyles();

    const { menuComponent, user } = props;

    return (
        <Box style={{minHeight: "1000px"}}>
            <Box className={classes.mainLayout}>
                <Header />
                <Box />
                {
                    menuComponent ??
                    <Menu>
                        <ListItemLink selected={location.pathname.startsWith('/profile')} primary="Профиль" to={'/profile'} icon={<ProfileIcon />} />
                        <ListItemLink selected={location.pathname.startsWith('/subjects')} primary="Курсы" to={'/subjects'} icon={<CoursesIcon />} />
                        {/* <ListItemLink selected={location.pathname.startsWith('/baige')} primary="Байге" to={'/baige'} icon={<GiftIcon />} /> */}
                        <ListItemLink selected={location.pathname.startsWith('/trial')} primary="Пробный Тест" to={'/trial'} icon={<ExamIcon />} />
                        {/*<ListItemLink selected={location.pathname.startsWith('/universities')} primary="Вузы" to={'/'} icon={<StudyIcon />} />*/}
                        {/*<ListItemLink selected={location.pathname.startsWith('/stats')} primary="Статистика" to={'/'} icon={<StatisticsIcon />} />*/}
                        <ListItemLink selected={location.pathname.startsWith('/notifications')} primary="Уведомления" to={'/notifications'} icon={<NotificationsNoneIcon />} />
                        {/* {
                            user?.id ?
                            <ListItemLink selected={location.pathname.startsWith("/subscriptions")}
                                          primary="Подписки" to={`/subscriptions?user_id=${user?.id}`}
                                          icon={<AccountBalanceWalletOutlinedIcon/>}/>
                            : ""
                        } */}
                    </Menu>
                }
                <Box gridArea="main">
                    {props.children}
                </Box>
            </Box>
        </Box>
    );

}

const mapStateToProps = ({ user }) => ({
    user: user.user,
})

export default connect(mapStateToProps, null)(MainLayout);