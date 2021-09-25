import React, {useState} from "react";
import {Box, Button, Link, Typography} from "@material-ui/core";
import ReactCodeInput from "react-code-input";
import {colors} from "constantValues";
import useStyles from "./styles";
import typography from "components/styles/typography";
import AuthLayout from "components/layouts/auth-layout";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {recoveryVerification, requestRecovery} from "actions";
import apiService from "services/api-service";

const CheckRecoveryCode = (props) => {
    const classes = useStyles();

    const { recoveryId, verificationId, recoveryVerification } = props;
    const [code, setCode] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(recoveryId);
        if (!recoveryId) return;
        recoveryVerification(recoveryId, code);
    };

    const handleResendClick = async () => {
        const data = await apiService.recoveryVerifyResend(recoveryId);
        console.log(data);
    }

    if (verificationId) {
        return <Redirect to="/resetPassword" />
    }

    return (
        <AuthLayout>
            <Box className={classes.brandName}>
                <Typography className={classes.brandText} variant="h6">Shoq.ai Group</Typography>
            </Box>
            <Box mt={15} width="100%">
                <form className={classes.loginForm} onSubmit={handleSubmit}>
                    <Typography variant="h5">Проверка кода</Typography>
                    <Box mt={6}>
                        <Typography className={typography.littleText}>Введите проверочный код здесь</Typography>
                        <Box mt={1}>
                            <ReactCodeInput inputStyle={{
                                "fontFamily": "monospace",
                                "MozAppearance": "textfield",
                                "WebkitAppearance": "none",
                                "borderRadius": "6px",
                                "border": "1px solid",
                                "boxShadow": "0px 0px 10px 0px rgba(0,0,0,.10)",
                                "margin": "4px",
                                "paddingLeft": "22px",
                                "width": "63px",
                                "height": "74px",
                                "fontSize": "32px",
                                "boxSizing": "border-box",
                                "color": "black",
                                "backgroundColor": colors.LIGHT_BLUE,
                                "borderColor": "lightgrey",
                            }} name={"asd"} value={code} onChange={setCode} fields={4} inputMode={"numeric"}/>
                        </Box>
                    </Box>
                    <Box mt={4} height="100px">
                        <Button
                            disableElevation
                            type="submit"
                            style={{textTransform: "none"}}
                            size="large"
                            color="primary"
                            variant="contained"
                            fullWidth>
                            Подтвердить
                        </Button>
                        <Box mt={1} display="flex" flexDirection="row" justifyContent="space-between">
                            <Link onClick={handleResendClick} variant="body2">Переотправить смс</Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </AuthLayout>
    );

}

const mapStateToProps = ({ auth }) => {
    return {
        recoveryId: auth.recoveryId,
        verificationId: auth.recoveryVerificationId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        recoveryVerification: (verificationId, code) => dispatch(recoveryVerification(verificationId, code)),
        recoveryRequest: (number) => dispatch(requestRecovery(number)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckRecoveryCode);