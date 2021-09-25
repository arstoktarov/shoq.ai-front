import React, {useState} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import LoginSvgImage from "svg/login-image.svg";
import typographyStyles from "components/styles/typography";
import useStyles from "./styles";
import AuthLayout from "components/layouts/auth-layout";
import TextField from "components/mui-customized/TextField";
import {Redirect, useHistory} from "react-router-dom";
import apiService from "services/api-service";
import {recoveryRequest, requestRecovery} from "actions";
import {connect} from "react-redux";

const PasswordRecoveryPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const typography = typographyStyles();

    const { recoveryRequest, verificationId } = props;

    const [phone, setPhone] = useState("+7");

    const handleChange = (event) => {
        let number = event.target.value;
        if (number.length < 2) {
            number = "+7" + number;
        }
        else if (!number.startsWith("+7")) {
            number = "+7" + number.substring(2, number.length);
        }
        setPhone(number);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        recoveryRequest(phone);
    }

    if (verificationId) {
        return <Redirect to={"/recoveryCode"}/>
    }

    return (
        <AuthLayout>
            <Box className={classes.brandName}>
                <Typography className={classes.brandText} variant="h6">Shoq.ai Group</Typography>
            </Box>
            <Box mt={15} width="100%">
                <form className={classes.loginForm} onSubmit={handleSubmit}>
                    <Typography variant="h5">Восстановить пароль</Typography>
                    <Box mt={4}>
                        <Typography className={typography.littleText}>Введите номер для восстановления</Typography>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                value={phone}
                                onChange={handleChange}
                                name="phone"
                                type="tel"
                                placeholder="Номер телефона"
                                variant="outlined"
                                fullWidth
                            />
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
                            Отправить код
                        </Button>
                    </Box>
                </form>
            </Box>
        </AuthLayout>
    );
}

const mapStateToProps = ({ auth }) => {
    return {
        verificationId: auth.recoveryId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        recoveryRequest: (number) => dispatch(requestRecovery(number)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryPage);