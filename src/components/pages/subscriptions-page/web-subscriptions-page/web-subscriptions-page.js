import React, {useEffect, useState} from "react";
import {Backdrop, Badge as MuiBadge, Box, CircularProgress, Tab as MuiTab} from "@material-ui/core";
import Header from "components/header/header";
import {withStyles} from "@material-ui/core/styles";
import SubscriptionItem from "components/pages/subscriptions-page/subscription-item";
import Typography from "components/mui-customized/Typography";
import {loadSubscriptions} from "actions/subscriptions-page-actions";
import {connect} from "react-redux";
import BuySection from "components/pages/subscriptions-page/buy-section";

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

const WebSubscriptionsPage = (props) => {
    const [currentTab, setCurrentTab] = useState(3);

    const { loading, subscriptions = [], loadSubscriptions, selectives, selectiveId, selectivePairId } = props;

    const [buyOption, setBuyOption] = useState(null);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const onTabClick = (index) => () => {
        setCurrentTab(index);
    }

    const getPriceByTab = (item) => {
        const { priceByTime } = item;
        return priceByTime.find(({ time }) => time === currentTab)?.price ?? 0;
    }

    const handleBuyClick = ({ packageType, optionType }) => (event) => {
        setBuyOption({
            packageType,
            optionType,
        });
    }

    const priceListSection = (
        <React.Fragment>
            <Box mt={5} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {
                    subscriptions.map(({packageType, options, title, features, nots}) => (
                        <Box alignSelf="flex-start" key={packageType} position="relative" display="flex" flexDirection="column">
                            <Box top="20%" borderLeft="2px dashed #1DA1F2" height="70%" position="absolute" left="50%">
                            </Box>
                            <Box height="420px">
                                <SubscriptionItem title={title} features={features} nots={nots} />
                            </Box>
                            {
                                options.map((option) => (
                                    <Box height="250px" key={option.optionType} mt={10}>
                                        <SubscriptionItem
                                            buyable
                                            onBuyClick={handleBuyClick({ packageType, optionType: option.optionType })}
                                            selectives={selectives}
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
        </React.Fragment>
    );

    return (
        <Box>
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Box p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box width="800px" flexDirection="column" display="flex" justifyContent="center">
                    <Box height="150px">
                        <Typography fontFamily="Roboto" variant="h5">Заплатите 50 тыщь долларов миллионов</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">и получите все что пожелаете</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="center" position="sticky" top="70px" zIndex="5">
                        {
                            tabs.map((item) => (
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
                    {
                        buyOption ?
                            <BuySection
                                subscriptions={subscriptions}
                                buyOption={buyOption}
                                currentTab={currentTab}
                            />
                            :
                            priceListSection
                    }
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

const mapStateToProps = ({ subscriptionsPage: { subscriptions, selectives, selectiveId, selectivePairId, loading } }) => ({
    loading,
    subscriptions,
    selectives,
    selectiveId,
    selectivePairId
});

const mapDispatchToProps = (dispatch) => ({
    "loadSubscriptions": () => dispatch(loadSubscriptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebSubscriptionsPage);