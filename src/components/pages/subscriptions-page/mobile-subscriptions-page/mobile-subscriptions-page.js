import React, {useEffect, useState} from "react";
import {Backdrop, Badge as MuiBadge, Box, CircularProgress, Tab as MuiTab} from "@material-ui/core";
import Header from "components/header/header";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import SubscriptionItem from "components/pages/subscriptions-page/subscription-item";
import Typography from "components/mui-customized/Typography";
import {loadSubscriptions, supportAvailableRefreshAction, supportWrite} from "actions/subscriptions-page-actions";
import {connect} from "react-redux";
import BuySection from "components/pages/subscriptions-page/buy-section";
import MobileBuySection
    from "components/pages/subscriptions-page/mobile-subscriptions-page/mobile-buy-section/mobile-buy-section";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import Breadcrumb from "components/mui-customized/breadcrumb";
import CrudModal from "components/crud-modal/crud-modal";

const Tab = withStyles((theme) => ({
    root: {
        fontFamily: "Roboto, Raleway, sans-serif",
        fontWeight: "bolder",
        textTransform: "none",
        color: theme.palette.primary.main,
        backgroundColor: "#F7F9FA",
        opacity: 1,
        borderRadius: "50px",
        minWidth: "100px",
        minHeight: "45px",
        boxShadow: "rgb(0 0 0 / 15%) 0px 0px 10px 1px",
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

const tabs = [
    1, 3, 6, 9, 12
];

const useStyles = makeStyles((theme) => ({
    tabs: {
        overflowX: "auto",
        overflowY: "hidden",
    },
    subscriptionTab: {
        fontFamily: "Roboto, Raleway, sans-serif",
        fontWeight: "bolder",
        textTransform: "none",
        color: theme.palette.primary.main,
        backgroundColor: "#F7F9FA",
        opacity: 1,
        borderRadius: "50px",
        minWidth: "100px",
        minHeight: "45px",
        boxShadow: "rgb(0 0 0 / 15%) 0px 0px 10px 1px",
    },
}));

const MobileSubscriptionsPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [currentTab, setCurrentTab] = useState(1);
    const [currentSubscriptionType, setCurrentSubscriptionType] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const queryParams = new URLSearchParams(history.location.search);
    const user_id = queryParams.get('user_id');

    const { loading, subscriptions = [], loadSubscriptions, selectives, selectiveId, selectivePairId, supportAvailableRefresh } = props;

    const [buyOption, setBuyOption] = useState(null);

    const scrollToStart = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        loadSubscriptions();
    }, []);

    useEffect(() => {
        scrollToStart();
    }, [buyOption]);

    useEffect(() => {
        setCurrentSubscriptionType(subscriptions[0]?.packageType ?? null);
    }, [subscriptions]);

    const onTabClick = (index) => () => {
        setCurrentTab(index);
    }

    const onSubscriptionTabClick = (item) => () => {
        setCurrentSubscriptionType(item.packageType);
    }

    const getPriceByTab = (item) => {
        const { priceByTime } = item;
        return priceByTime.find(({ time }) => time === currentTab)?.price ?? 0;
    }

    const handleBuyClick = ({ packageType, optionType }) => (event) => {
        if (!selectiveId || !selectivePairId) {
            enqueueSnackbar('Пожалуйста, выберите предметы для курса', {variant: "error"});
            return;
        }
        setBuyOption({
            packageType,
            optionType,
        });
    }

    const handleBackClick = () => {
        if (buyOption) {
            setBuyOption(null);
        }
        else {
            history.goBack();
        }
    }

    const handleSupportClick = () => {
        supportAvailableRefresh();
    }

    const currentSubscription = subscriptions.find((s) => s.packageType === currentSubscriptionType);

    const priceList = () => (
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            {
                currentSubscription ?
                    <Box mt={5}>
                        <SubscriptionItem
                            onBuyClick={() => {}}
                            selectives={selectives}
                            title={`${currentSubscription.title}`}
                            features={currentSubscription.features}
                            nots={currentSubscription.nots}
                        />
                    </Box>
                    : ""
            }
            {
                subscriptions.find(s => s.packageType === currentSubscriptionType)?.options.map((option) => (
                    <Box height="250px" width="250px" key={option.optionType} mt={8}>
                        <SubscriptionItem
                            buyable
                            onBuyClick={handleBuyClick({
                                packageType: currentSubscriptionType,
                                optionType: option.optionType
                            })}
                            selectives={selectives}
                            title={`${option.optionType} предметов`}
                            features={option.subjects}
                            price={getPriceByTab(option)}
                        />
                    </Box>
                ))
            }
        </Box>
    );
    return (
        <Box>
            <Header />
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Box>
                <Box flexDirection="column" display="flex" justifyContent="center">
                    <Box px={3} py={1} alignSelf="flex-start">
                        <Breadcrumb onClick={handleBackClick} primaryText="Назад"/>
                    </Box>
                    <Box px={3}>
                        <Typography fontFamily="Roboto" variant="h5">Заплатите 50 тыщь долларов миллионов</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">и получите все что пожелаете</Typography>
                        </Box>
                    </Box>
                    {
                        !buyOption ?
                        <React.Fragment>
                            <Box py={3} className={classes.tabs} display="flex" flexDirection="row">
                                {
                                    subscriptions.map((item) => (
                                        <Box key={item.title} mx={2}>
                                            <Badge badgeContent="-15%" anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}>
                                                <Tab
                                                    onClick={onSubscriptionTabClick(item)}
                                                    variant="scrollable"
                                                    label={`${item.title}`}
                                                    selected={currentSubscriptionType === item.packageType}
                                                />
                                            </Badge>
                                        </Box>
                                    ))
                                }
                            </Box>
                            <Box py={3} className={classes.tabs}
                                 display="flex"
                                 flexDirection="row"
                                 position="sticky"
                                 top="30px"
                                 zIndex="5">
                                {
                                    tabs.map((item) => (
                                        <Box key={item} mx={2}>
                                            <Badge badgeContent="-15%" anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}>
                                                <Tab variant="scrollable" onClick={onTabClick(item)}
                                                     label={`${item} месяца`} selected={currentTab === item}/>
                                            </Badge>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </React.Fragment>
                        : ""
                    }
                    {
                        buyOption ?
                        <MobileBuySection
                            userId={user_id}
                            subscriptions={subscriptions}
                            buyOption={buyOption}
                            currentTab={currentTab}
                            currentSubscription={currentSubscription}
                        />
                        :
                        priceList()
                    }
                    <Box boxSizing="border-box" height="300px" p={3} mt={10}>
                        <Typography fontFamily="Roboto" variant="h5">Возникли вопросы?</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">Закажите звонок для бесплатной консультации</Typography>
                        </Box>
                        <Box mt={3}>
                            <Tab label="Заказать звонок" onClick={handleSupportClick} selected />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const mapStateToProps = ({ subscriptionsPage: { subscriptions, selectives, selectiveId, selectivePairId, loading, supportAvailable } }) => ({
    loading,
    subscriptions,
    selectives,
    selectiveId,
    selectivePairId,
    supportAvailable,
});

const mapDispatchToProps = (dispatch) => ({
    "loadSubscriptions": () => dispatch(loadSubscriptions()),
    supportAvailableRefresh: (payload) => dispatch(supportAvailableRefreshAction(payload)),
    supportWrite: (payload) => dispatch(supportWrite(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileSubscriptionsPage);