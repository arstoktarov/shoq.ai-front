import React, {useEffect, useState} from "react";
import {Badge as MuiBadge, Box, Tab as MuiTab} from "@material-ui/core";
import Header from "components/header/header";
import {withStyles} from "@material-ui/core/styles";
import SubscriptionItem from "components/pages/subscriptions-page/subscription-item";
import Typography from "components/mui-customized/Typography";
import {loadSubscriptions} from "actions/subscriptions-page-actions";
import {connect} from "react-redux";

// const useStyles = makeStyles((theme) => ({
//     root: {},
//     subscription: {
//         maxWidth: "250px",
//         backgroundColor: "#F7F9FA",
//         boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.15)",
//         borderRadius: "20px",
//         boxSizing: "border-box",
//         position: "relative",
//     },
//     hot: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         transform: "rotate(0.125turn)",
//         position: "absolute",
//         backgroundColor: theme.palette.primary.main,
//         right: "-100px",
//         top: "10px",
//         width: "100%",
//         height: "20px",
//     },
// }));

const Tab = withStyles((theme) => ({
    root: {
        fontFamily: "Roboto, Raleway, sans-serif",
        fontWeight: "bolder",
        textTransform: "none",
        color: theme.palette.primary.main,
        backgroundColor: "#F7F9FA",
        borderRadius: "50px",
        minWidth: "100px",
        minHeight: "45px",
    },
    selected: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
    },
}))(MuiTab);

const Badge = withStyles(() => ({
    badge: {
        fontSize: "10px",
        color: "#5B7083",
        fontFamily: "Roboto, Raleway",
        backgroundColor: "#F7F9FA",
        boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.15)",
        borderRadius: "50px",
        right: "20px",
        userSelect: "none",
    },
}))(MuiBadge);

const rows = [
    {
        title: "Полный доступ на видеоуроки",
        disabled: false,
    },
    {
        title: "Тесты коп соз",
        disabled: false,
    },
    {
        title: "Задания коп",
        disabled: false,
    },
    {
        title: "Индивидуальный куратор",
        disabled: false,
    },
    {
        title: "Возможность участия в БАЙГЕ",
        disabled: true,
    },
    {
        title: "То се. еринип калдым кошируге еркеден",
        disabled: true,
    },
    {
        title: "То се. еринип калдым кошируге еркеден",
        disabled: true,
    },
];

const tabs = [
    1, 3, 6, 9, 12
];

const SubscriptionsPage = (props) => {
    const [currentTab, setCurrentTab] = useState(1);

    const { subscriptions = [], loadSubscriptions } = props;

    console.log(subscriptions);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const onTabClick = (index) => () => {
        setCurrentTab(index);
    }

    const getPriceByTab = (item) => {
        console.log(item);
        return item.priceByTime.find(({ time }) => time === currentTab)?.price ?? 0;
    }

    return (
        <Box>
            <Header />
            <Box p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box width="800px" flexDirection="column" display="flex" justifyContent="center">
                    <Box height="150px">
                        <Typography fontFamily="Roboto" variant="h5">Заплатите 50 тыщь долларов миллионов</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">и получите все что пожелаете</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="center">
                        {
                            tabs.map((item, idx) => (
                                <Box key={item} mx={2}>
                                    <Badge badgeContent="-15%" anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}>
                                        <Tab onClick={onTabClick(item)} label={`${item} месяца`} selected={currentTab === item} />
                                    </Badge>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box mt={5} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                        {
                            subscriptions.map((item, idx) => (
                                <Box alignSelf="flex-start" key={item.packageType} position="relative" display="flex" flexDirection="column">
                                    <Box top="20%" borderLeft="2px dashed #1DA1F2" height="70%" position="absolute" left="50%">
                                    </Box>
                                    <Box height="470px">
                                        <SubscriptionItem title={item.title} features={item.features} nots={item.nots} />
                                    </Box>
                                    {
                                        item.options.map((option, idx) => (
                                            <Box height="250px" key={option.optionType} mt={10}>
                                                <SubscriptionItem
                                                    withBuyButton
                                                    title={`${option.optionType} предметов`}
                                                    features={option.subjects}
                                                    price={getPriceByTab(option)}
                                                />
                                            </Box>
                                        ))
                                    }
                                </Box>
                            ))
                        }
                    </Box>
                    <Box mt={10} height="150px">
                        <Typography fontFamily="Roboto" variant="h5">Возникли вопросы?</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">Закажите звонок для бесплатной консультации</Typography>
                        </Box>
                        <Box mt={3}>
                            <Tab label="Заказать звонок" onClick={() => {}} selected />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const mapStateToProps = ({ subscriptionsPage: { subscriptions } }) => ({
    subscriptions,
})

const mapDispatchToProps = (dispatch) => ({
    loadSubscriptions: () => dispatch(loadSubscriptions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsPage);