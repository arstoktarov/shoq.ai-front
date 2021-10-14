import React from "react";
import {Box, SvgIcon} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import PropTypes from "prop-types";
import useStyles from "./styles";
import Button from "components/mui-customized/Button";
import {colors} from "constantValues";
import {connect} from "react-redux";
import SelectableSubjects from "components/pages/subscriptions-page/subscription-item/selectable-subjects";

const SubscriptionItem = (props) => {
    const classes = useStyles(props);
    const {
        selectives,
        title = "Basic",
        features = [],
        nots = [],
        hit = false,
        buyable = false,
        oldPrice,
        price,
        onBuyClick = () => {},
    } = props;

    const hitUI = () => {
        if (hit) {
            return (
                <Box zIndex="1" position="absolute" top="0" left="0" height="100%" width="100%" overflow="hidden">
                    <Box className={classes.hot}>
                        <Typography htmlcolor="white">хит</Typography>
                    </Box>
                </Box>
            );
        }
        else return "";
    }
    const priceUI = () => {
        if (price) {
            return (
                <React.Fragment>
                    <Box display="flex" position="absolute" top="-40px" right="15px">
                        <SvgIcon color="secondary" style={{width: "5em", height: "5em"}} width="103px" height="62px" viewBox="0 0 103 62">
                            <path d="M11.865 0L0.898438 13.3165H11.865V0Z"/>
                            <path d="M11.865 0V32.6822C11.865 35.1728 13.2186 37.4674 15.3936 38.6781L53.9196 60.2172C56.0136 61.3933 58.582 61.3933 60.6761 60.2172L99.202 38.6781C101.377 37.4559 102.731 35.1613 102.731 32.6822V6.88376C102.731 3.07867 99.6416 0 95.8237 0H11.865Z"/>
                        </SvgIcon>
                    </Box>
                    <Box px={2} position="absolute" top="-10px" right="15px" width="74px" display="flex" flexDirection="row" justifyContent="center">
                        <Typography style={{textDecoration: "line-through"}} fontFamily="Roboto; Raleway" htmlcolor="white">{price + 1000} ₸</Typography>
                    </Box>
                    <Box px={2} position="absolute" top="10px" right="15px" width="74px" display="flex" flexDirection="row" justifyContent="center">
                        <Typography fontFamily="Roboto; Raleway" htmlcolor="white">{price} ₸</Typography>
                    </Box>
                </React.Fragment>
            );
        }
        if (oldPrice) {
            return (
                <React.Fragment>
                    <Box display="flex" position="absolute" top="-40px" right="15px">
                        <SvgIcon color="primary" style={{width: "5em", height: "5em"}} width="103px" height="62px" viewBox="0 0 103 62">
                            <path d="M11.865 0L0.898438 13.3165H11.865V0Z"/>
                            <path d="M11.865 0V32.6822C11.865 35.1728 13.2186 37.4674 15.3936 38.6781L53.9196 60.2172C56.0136 61.3933 58.582 61.3933 60.6761 60.2172L99.202 38.6781C101.377 37.4559 102.731 35.1613 102.731 32.6822V6.88376C102.731 3.07867 99.6416 0 95.8237 0H11.865Z"/>
                        </SvgIcon>
                    </Box>
                    <Box px={2} position="absolute" top="0" right="15px" width="74px" display="flex" flexDirection="row" justifyContent="center">
                        <Typography fontFamily="Roboto; Raleway" htmlcolor="white">{price} ₸</Typography>
                    </Box>
                </React.Fragment>
            )
        }
        else return "";
    }

    return (
        <Box height={buyable ? "270px" : "auto"} px={3} py={2} className={classes.subscription}>
            <Box>
                <Typography fontFamily="Roboto; Raleway" fontSize="24px">{title}</Typography>
            </Box>
            {
                hitUI()
            }
            {
                priceUI()
            }
            <Box mt={2}>
                {
                    features.map((item, idx) => (
                        <Box key={idx} mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                            <Box mr={1}>
                                <CheckCircleRoundedIcon color="primary" style={{width: 12, height: 12}} fontSize="small"/>
                            </Box>
                            <Typography customVariant="littleTextRoboto">{item.toString()}</Typography>
                        </Box>
                    ))
                }
                {
                    buyable ?
                        <SelectableSubjects />
                    : ""
                }
                {
                    nots.map((item, idx) => (
                        <Box key={idx} mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                            <Box mr={1}>
                                <CancelRoundedIcon color="action" style={{width: 12, height: 12}} fontSize="small"/>
                            </Box>
                            <Typography htmlcolor="#C3C3C3" customVariant="subtitleRoboto">{item}</Typography>
                        </Box>
                    ))
                }
            </Box>
            {
                buyable ?
                <Box flexGrow="1" mt={2} display="flex" flexDirection="row" justifyContent="center" alignItems="flex-end">
                    <Button onClick={onBuyClick} variant="contained" color="primary">Купить</Button>
                </Box>
                : ""
            }
        </Box>
    );
}

SubscriptionItem.propTypes = {
    title: PropTypes.string,
    features: PropTypes.array,
    nots: PropTypes.array,
    hit: PropTypes.bool,
    premium: PropTypes.bool,
    buyable: PropTypes.bool,
    price: PropTypes.any,
}

const mapStateToProps = ({ subscriptionsPage: { selectives } }) => ({
    selectives,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionItem);