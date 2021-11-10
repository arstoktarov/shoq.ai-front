import React, {useEffect, useState} from "react";
import apiService from "services/api-service";
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Box, Button, Divider, FormControlLabel, Radio
} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import useStyles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import TextField from "components/mui-customized/TextField/TextField";
import SelectableSubjects from "components/pages/subscriptions-page/subscription-item/selectable-subjects";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    kaspiAvailableRefreshAction, kaspiWrite,
    supportAvailableRefreshAction,
    supportWrite
} from "actions/subscriptions-page-actions";

const Accordion = withStyles({
    root: {
        backgroundColor: 'white',
        border: '0.5px solid #CCD4E1',
        borderRadius: '10px',
        marginBottom: '1rem',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: "0 0 1rem 0",
        },
    },
    expanded: {},
})(MuiAccordion);
const AccordionDetails = withStyles(() => ({
    root: {
        padding: 0,
    },
}))(MuiAccordionDetails);
const AccordionSummary = withStyles({
    root: {
        minHeight: '64px',
        justifyContent: "center",
        textTransform: "none",
        '&$expanded': {
            minHeight: '64px',
            background: '#F7F9FA',
            borderRadius: '10px 10px 0 0',
            borderBottom: '0.5px solid #CCD4E1',
        },
    },
    content: {
        margin: '0 0',
        padding: '5px',
        '&$expanded': {
            margin: '0 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);


const BuySection = (props) => {
    const classes = useStyles(props);
    const history = useHistory();

    const [paymentType, setPaymentType] = React.useState('card');
    const [kaspiName, setKaspiName] = useState("");
    const [kaspiNumber, setKaspiNumber] = useState("+7");
    const [kaspiLeftSeconds, setKaspiLeftSeconds] = useState(0);

    const { userId,
        selectiveId, selectivePairId,
        subscriptions, buyOption = {}, currentTab,
        kaspiAvailable, kaspiAvailableRefresh, kaspiWrite,
    } = props;

    useEffect(() => {
        setKaspiLeftSeconds(kaspiAvailable.leftSeconds);
        let interval = setInterval(() => {
            setKaspiLeftSeconds((s) => {
                if (s > 0) {
                    return s - 1;
                }
                else {
                    if (kaspiAvailable.isAvailable === false) {
                        kaspiAvailableRefresh(userId);
                    }
                    return s;
                }
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [kaspiAvailable]);

    useEffect(() => {
        kaspiAvailableRefresh(userId);
    }, []);

    const { packageType, optionType } = buyOption;
    const pkg = subscriptions.find((i) => i.packageType === packageType);
    const option = pkg.options.find((i) => i.optionType === optionType);

    const { features = [] } = pkg;
    const { subjects } = option;


    const handleChange = (input) => (event) => {
        const value = event.target.value;
        switch (input) {
            case "name":
                setKaspiName(value);
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
        setKaspiNumber(number);
    }

    const getPriceByTab = (item) => {
        const { priceByTime } = item;
        return priceByTime.find(({ time }) => time === currentTab)?.price ?? 0;
    }

    const handleRadioChange = (event) => {
        setPaymentType(event.target.value);
    };

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setPaymentType(panel);
    };

    const handleBuyClick = async () => {
        let uid = parseInt(userId);
        const { data } = await apiService.buyPackage({
            userId: uid,
            packageType,
            optionType,
            priceId: currentTab,
            subjectGlobalIds: [
                selectiveId, selectivePairId
            ],
            language: "KZ",
        });
        const { PgRedirectURL } = data;
        window.location.href = PgRedirectURL;
    }

    const handleRequestClick = () => {
        kaspiWrite({
            studentId: userId,
            name: kaspiName,
            number: kaspiNumber,
            content: "   ",
        });
    }

    const paymentUI = () => {
        switch (paymentType) {
            case "kaspi":
                return (
                    <Box display="flex" flexDirection="column">
                        <Box mt={3} display="flex" flexDirection="row" alignItems="center">
                            <Box mr={2}>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        }
                                    }}
                                    autoComplete="off"
                                    name="number"
                                    type="tel"
                                    onChange={handleChange("number")}
                                    value={kaspiNumber}
                                    placeholder="Номер телефона"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box mr={2}>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            input: classes.input,
                                        }
                                    }}
                                    autoComplete="off"
                                    name="firstName"
                                    type="text"
                                    onChange={handleChange("name")}
                                    placeholder="Ваше имя"
                                    value={kaspiName}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box>
                                <Button className={classes.buyButton} onClick={handleRequestClick} disabled={!kaspiAvailable.isAvailable} color="primary" variant="contained">
                                    Оставить заявку
                                </Button>
                            </Box>
                        </Box>
                        <Box mt={2}>
                            {
                                !kaspiAvailable.isAvailable ?
                                    <Box>
                                        <Typography customVariant="littleTextRoboto">{`Кнопка будет доступна через: ${kaspiLeftSeconds}`}</Typography>
                                    </Box>
                                    : ""
                            }
                        </Box>
                    </Box>
                );
            case "card":
                return (
                    <Box width="100%" mt={3} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                        <Box>
                            <Button onClick={handleBuyClick} className={classes.buyButton} color="primary" variant="contained">
                                Оплатить
                            </Button>
                        </Box>
                    </Box>
                );
        }
    }

    return (
        <Box mt={8}>
            <Box display="flex" flexDirection="row">
                <Box className={classes.subscription}>
                    <Box px={3} py={2}>
                        <Box>
                            <Typography fontFamily="Roboto; Raleway" fontSize="24px">{pkg.title}</Typography>
                        </Box>
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
                        </Box>
                    </Box>
                    <Divider />
                    <Box px={3} py={2}>
                        <Box>
                            {
                                subjects.map((item, idx) => (
                                    <Box key={idx} mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                                        <Box mr={1}>
                                            <CheckCircleRoundedIcon color="primary" style={{width: 12, height: 12}} fontSize="small"/>
                                        </Box>
                                        <Typography customVariant="littleTextRoboto">{item.toString()}</Typography>
                                    </Box>
                                ))
                            }
                            {
                                <SelectableSubjects />
                            }
                        </Box>
                    </Box>
                </Box>
                <Box width="100%" px={5} display="flex" flexDirection="column">
                    <Accordion square expanded={paymentType === 'card'} onChange={handleAccordionChange('card')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <FormControlLabel
                                aria-label="Acknowledge"
                                control={<Radio checked={paymentType === 'card'}/>}
                                label={<Typography>Через банковскую карту</Typography>}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box p={2}>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">1. Оставьте заявку на звонок</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">2. и мы вам перезвоним</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">3. потом поймете что да как</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">4. наслаждайтесь курсом</Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={paymentType === 'kaspi'} onChange={handleAccordionChange('kaspi')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <FormControlLabel
                                aria-label="Acknowledge"
                                control={<Radio checked={paymentType === 'kaspi'}/>}
                                label={<Typography>На рассрочку Kaspi.kz</Typography>}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box p={2}>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">1. Оставьте заявку на звонок</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">2. и мы вам перезвоним</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">3. потом поймете что да как</Typography>
                                <Typography fontWeight={500} customVariant="subtitleRoboto">4. наслаждайтесь курсом</Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Box flexGrow="1" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
                        <Divider style={{width: "100%"}}/>
                        <Box mt={1} width="100%" display="flex" flexDirection="row" alignItems="center">
                            <Box>
                                <Typography fontWeight="400" fontFamily="Roboto, Raleway">Итого</Typography>
                            </Box>
                            <Box ml="auto">
                                <Typography fontFamily="Roboto, Raleway">{getPriceByTab(option)} ₸</Typography>
                            </Box>
                        </Box>
                        {
                            paymentUI()
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

const mapStateToProps = ({ subscriptionsPage: { selectiveId, selectivePairId, kaspiAvailable } }) => ({
    selectiveId,
    selectivePairId,
    kaspiAvailable,
});

const mapDispatchToProps = (dispatch) => ({
    kaspiAvailableRefresh: (userId) => dispatch(kaspiAvailableRefreshAction(userId)),
    kaspiWrite: (payload) => dispatch(kaspiWrite(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuySection);