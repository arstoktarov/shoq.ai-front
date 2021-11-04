import React, {useEffect, useState} from "react";
import {Backdrop, Badge as MuiBadge, Box, CircularProgress, Tab as MuiTab, TextField} from "@material-ui/core";
import Header from "components/header/header";
import {withStyles} from "@material-ui/core/styles";
import SubscriptionItem from "components/pages/subscriptions-page/subscription-item";
import Typography from "components/mui-customized/Typography";
import {loadSubscriptions, supportAvailableRefreshAction, supportWrite} from "actions/subscriptions-page-actions";
import {connect} from "react-redux";
import BuySection from "components/pages/subscriptions-page/buy-section";
import {useHistory} from "react-router-dom";
import Breadcrumb from "components/mui-customized/breadcrumb";
import useStyles from "./styles";

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
    const classes = useStyles();
    const history = useHistory();
    const [currentTab, setCurrentTab] = useState(3);
    const [supportName, setSupportName] = useState("");
    const [supportNumber, setSupportNumber] = useState("+7");
    const [supportContent, setSupportContent] = useState("");
    const [supportLeftSeconds, setSupportLeftSeconds] = useState(0);

    const queryParams = new URLSearchParams(history.location.search);
    const user_id = parseInt(queryParams.get('user_id'));

    const { loading, subscriptions = [], loadSubscriptions,
        selectives, selectiveId, selectivePairId,
        supportAvailable, supportWrite, supportAvailableRefresh
    } = props;

    const [buyOption, setBuyOption] = useState(null);

    useEffect(() => {
        setSupportLeftSeconds(supportAvailable.leftSeconds);
        let interval = setInterval(() => {
            setSupportLeftSeconds((s) => {
                if (s > 0) {
                    return s - 1;
                }
                else {
                    if (supportAvailable.isAvailable === false) {
                        supportAvailableRefresh(user_id);
                    }
                    return s;
                }
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [supportAvailable]);

    useEffect(() => {
        loadSubscriptions();
        supportAvailableRefresh(user_id);
    }, []);

    useEffect(() => {
        scrollToStart();
    }, [buyOption]);

    const scrollToStart = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handleChange = (input) => (event) => {
        const value = event.target.value;
        switch (input) {
            case "name":
                setSupportName(value);
                break;
            case "content":
                setSupportContent(value);
                break;
            case "number":
                handleNumberChange(value)
                break;
        }
    }

    const handleNumberChange = (value) => {
        let number = value;
        if (number.length < 2 && number !== "+") {
            number = "+7" + number;
        }
        if (!number.startsWith("+7")) {
            number = "+7" + number.substring(2, number.length);
        }
        setSupportNumber(number);
    }

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

    const handleBackClick = () => {
        if (buyOption) {
            setBuyOption(null);
        }
        else {
            history.goBack();
        }
    }

    const handleSupportClick = () => {
        supportWrite({
            studentId: user_id,
            name: supportName,
            number: supportNumber,
            content: supportContent,
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
                <Box alignSelf="flex-start">
                    <Breadcrumb onClick={handleBackClick} primaryText="Назад"/>
                </Box>
                <Box width="800px" flexDirection="column" display="flex" justifyContent="center">
                    <Box height="150px">
                        <Typography fontFamily="Roboto" variant="h5">Заплатите 50 тыщь долларов миллионов</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">и получите все что пожелаете</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="center" position="sticky" top="10px" zIndex="5">
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
                                userId={user_id}
                                subscriptions={subscriptions}
                                buyOption={buyOption}
                                currentTab={currentTab}
                            />
                            :
                            priceListSection
                    }
                    <Box mt={10} width="100%">
                        <Typography fontFamily="Roboto" variant="h5">Возникли вопросы?</Typography>
                        <Box mt={2}>
                            <Typography fontFamily="Roboto" customVariant="littleTextRoboto">Закажите звонок для бесплатной консультации</Typography>
                        </Box>
                        <Box mt={2} width="100%">
                            <TextField
                                InputProps={{
                                    classes: {
                                        root: classes.textField,
                                        input: classes.input,
                                    }
                                }}
                                autoComplete="off"
                                name="name"
                                onChange={handleChange("name")}
                                value={supportName}
                                type="text"
                                placeholder="Ваше имя"
                                variant="outlined"
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        root: classes.textField,
                                        input: classes.input,
                                    }
                                }}
                                autoComplete="off"
                                onChange={handleChange("number")}
                                value={supportNumber}
                                name="number"
                                type="tel"
                                placeholder="Номер телефона"
                                variant="outlined"
                            />
                        </Box>
                        <Box mt={1} width="300px">
                            <TextField
                                InputProps={{
                                    classes: {
                                        root: classes.textField,
                                        input: classes.input,
                                    }
                                }}
                                multiline={true}
                                rows={3}
                                autoComplete="off"
                                onChange={handleChange("content")}
                                value={supportContent}
                                name="content"
                                type="text"
                                placeholder="Вопрос"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        {
                            !supportAvailable.isAvailable ?
                            <Box mt={2}>
                                <Typography customVariant="littleTextRoboto">{`Кнопка будет доступна через: ${supportLeftSeconds}`}</Typography>
                            </Box>
                            : ""
                        }
                        <Box mt={3}>
                            <Tab label="Заказать звонок" onClick={handleSupportClick} disabled={!supportAvailable.isAvailable} selected />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const mapStateToProps = ({ subscriptionsPage }) => ({
    loading: subscriptionsPage.loading,
    subscriptions: subscriptionsPage.subscriptions,
    selectives: subscriptionsPage.selectives,
    selectiveId: subscriptionsPage.selectiveId,
    selectivePairId: subscriptionsPage.selectivePairId,
    supportAvailable: subscriptionsPage.supportAvailable,
});

const mapDispatchToProps = (dispatch) => ({
    "loadSubscriptions": () => dispatch(loadSubscriptions()),
    supportAvailableRefresh: (userId) => dispatch(supportAvailableRefreshAction(userId)),
    supportWrite: (payload) => dispatch(supportWrite(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebSubscriptionsPage);