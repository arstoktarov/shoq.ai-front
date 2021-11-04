import React, {useEffect} from "react";
import apiService from "services/api-service";
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Box, Button, Divider, FormControlLabel, Radio, Tab as MuiTab
} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import useStyles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import TextField from "components/mui-customized/TextField/TextField";
import SelectableSubjects from "components/pages/subscriptions-page/subscription-item/selectable-subjects";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Breadcrumb from "components/mui-customized/breadcrumb";

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


const MobileBuySection = (props) => {
    const classes = useStyles(props);
    const history = useHistory();

    const { userId, selectiveId, selectivePairId, subscriptions, buyOption = {}, currentTab, currentSubscription } = props;
    const [paymentType, setPaymentType] = React.useState('card');
    const { packageType, optionType } = buyOption;
    const pkg = subscriptions.find((i) => i.packageType === packageType);
    const option = pkg.options.find((i) => i.optionType === optionType);

    const { features = [] } = pkg;
    const { subjects } = option;

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

    }

    const paymentUI = () => {
        switch (paymentType) {
            case "kaspi":
                return (
                    <Box mt={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box width="100%">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                autoComplete="off"
                                name="number"
                                type="tel"
                                defaultValue="+7 705 158 1895"
                                placeholder="Номер телефона"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={2} width="100%">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                autoComplete="off"
                                name="firstName"
                                type="text"
                                placeholder="Ваше имя"
                                defaultValue="Arsen"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={2} width="100%" display="flex" flexDirection="row" justifyContent="center">
                            <Button className={classes.buyButton} color="primary" variant="contained">
                                Оставить заявку
                            </Button>
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
        <Box>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" px={3} py={2} alignItems="center" justifyContent="center">
                    <Tab label={currentSubscription.title} selected/>
                    <Box mt={2}>
                        <Tab label={`${currentTab} месяца`} selected/>
                    </Box>
                </Box>
                <Box px={5} display="flex" flexDirection="column">
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

const mapStateToProps = ({ subscriptionsPage: { selectiveId, selectivePairId } }) => ({
    selectiveId,
    selectivePairId
})

export default connect(mapStateToProps, null)(MobileBuySection);