import React from "react";
import {Box, SvgIcon} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import useStyles from "./styles";
import PremiumBackground from "svg/premium-bg.svg";
import Button from "components/mui-customized/Button";

const SubscriptionItem = (props) => {
    const classes = useStyles(props);

    const {
        title = "Basic",
        features = [],
        nots = [],
        hit = false,
        premium = false,
        withBuyButton = false,
        price,
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
                        <SvgIcon style={{width: "5em", height: "5em"}} width="103px" height="62px" viewBox="0 0 103 62">
                            <path d="M11.865 0L0.898438 13.3165H11.865V0Z" fill="#1D74A9"/>
                            <path d="M11.865 0V32.6822C11.865 35.1728 13.2186 37.4674 15.3936 38.6781L53.9196 60.2172C56.0136 61.3933 58.582 61.3933 60.6761 60.2172L99.202 38.6781C101.377 37.4559 102.731 35.1613 102.731 32.6822V6.88376C102.731 3.07867 99.6416 0 95.8237 0H11.865Z" fill="#1DA1F2"/>
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
        <Box height={withBuyButton ? "270px" : "auto"} px={3} py={2} className={classes.subscription}>
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
                    [...features, "Выберите 1 предмет","Выберите 1 предмет"].map((item, idx) => (
                        <Box key={idx} mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                            <Box mr={1}>
                                <CheckCircleRoundedIcon color="primary" style={{width: 12, height: 12}} fontSize="small"/>
                            </Box>
                            <Typography customVariant="littleTextRoboto">{item.toString()}</Typography>
                        </Box>
                    ))
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
                withBuyButton ?
                <Box flexGrow="1" mt={2} display="flex" flexDirection="row" justifyContent="center" alignItems="flex-end">
                    <Button variant="contained" color="primary">Купить</Button>
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
    withBuyButton: PropTypes.bool,
    price: PropTypes.any,
}

export default SubscriptionItem;