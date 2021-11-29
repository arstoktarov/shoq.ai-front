import React, {useState} from 'react';
import {Box, Button, IconButton as MuiIconButton} from "@material-ui/core";
import TextField from "components/mui-customized/TextField";
import useStyles from "./styles";
import apiService from "services/api-service";
import { colors } from 'constantValues';
import AuthLayout from "components/layouts/auth-layout";
import {withStyles} from "@material-ui/core/styles";
import {Redirect, useHistory} from "react-router-dom";
import Typography from "components/mui-customized/Typography";
import {registerFailure, requestRegister} from "actions";
import {connect} from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const IconButton = withStyles({
    root : {
        color: "#5B7083",
        '&$disabled': {
            color: "black",
            backgroundColor: colors.LIGHT_BLUE,
        },
    },
    disabled: {
        color: "black",
        backgroundColor: colors.LIGHT_BLUE,
    }
})(MuiIconButton);

const RegisterPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const grades = [7, 8, 9, 10, 11];

    const { registerAction, registerFailure, verificationId, errorMessage } = props;

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword]  = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [phone, setPhone] = useState("+7");
    const [grade, setGrade] = useState(10);
    const [captchaSuccess, setCaptchaSuccess] = useState(false);

    const register = async (event) => {
        event.preventDefault();
        if (password !== passwordRepeat) {
            registerFailure("Пароли не совпадают");
            return;
        }
        if (!captchaSuccess) {
            registerFailure("Проверка recaptcha не пройдена");
            return;
        }
        registerAction(fullname, username, password, phone, grade);
    }

    const verify = async (event) => {
        console.log("VERIFY");
        event.preventDefault();
        if (!verificationId) return;
        const { data } = await apiService.verify(verificationId, code);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('access_token', data.token);
        history.push('/');
        console.log(data);
    }

    const handleChange = (input) => (event) => {
        const value = event.target.value;
        switch (input) {
            case 'fullname':
                setFullname(value)
                break;
            case 'username':
                setUsername(value)
                break;
            case 'password':
                setPassword(value)
                break;
            case 'passwordRepeat':
                setPasswordRepeat(value)
                break;
            case 'phone':
                handleNumberChange(value);
                break;
            case 'grade':
                setGrade(value)
                break;
            case 'code':
                setCode(value)
                break;
        }
    }

    const handleNumberChange = (value) => {
        let number = value;
        number = number.match(/(\+.|\d*)/g).join('');
        if (number.length > 12) return;
        if (number.length < 2 && number !== "+") {
            number = "+7" + number;
        }
        if (!number.startsWith("+7")) {
            number = "+7" + number.substring(2, number.length);
        }
        setPhone(number);
    }

    const handleGradeClick = (value) => {
        setGrade(value);
    }

    const onCaptchaChange = (value) => {
        const formData = new FormData();
        formData.append('secret', '6LcXAWgdAAAAAFm5VUjbNorlofWqo_bJj02BxDot');
        formData.append('response', value);
        axios.post('https://www.google.com/recaptcha/api/siteverify', formData).then(() => {
            setCaptchaSuccess(true);
        });
        console.log("Captcha value:", value);
    }

    if (verificationId !== null) {
        return <Redirect to={"/code"} />
    }

    return (
        <AuthLayout>
            <Box className={classes.brandName}>
                <Typography className={classes.brandText} variant="h6">Shoq.ai Group</Typography>
            </Box>
            <Box mt={10} width="100%">
                <form className={classes.loginForm} onSubmit={register}>
                    <Typography variant="h5">Зарегистрироваться</Typography>
                    <Box fontFamily="Roboto, Arial" mt={4}>
                        <Box>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                autoComplete="off"
                                name="fullname"
                                value={fullname}
                                onChange={handleChange("fullname")}
                                placeholder="Полное имя"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                name="username"
                                value={username}
                                onChange={handleChange("username")}
                                placeholder="Имя пользователя"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange("password")}
                                placeholder="Пароль"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                name="password"
                                type="password"
                                value={passwordRepeat}
                                onChange={handleChange("passwordRepeat")}
                                placeholder="Повторите пароль"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={handleChange("phone")}
                                placeholder="Номер телефона"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <Typography style={{fontSize: "12px"}} color="secondary">{errorMessage}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" mt={1}>
                            <Typography customVariant="bodyRobotoGray">
                                Ваш класс
                            </Typography>
                            <Box ml="auto">
                                {
                                    grades.map((item, idx) => (
                                        <IconButton
                                            key={idx}
                                            onClick={() => {handleGradeClick(item)}}
                                            disabled={item === grade}
                                            disableTouchRipple
                                        >
                                            <Typography fontWeight={500} customVariant="bodyRobotoGray">
                                                {item}
                                            </Typography>
                                        </IconButton>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>
                </form>
                <ReCAPTCHA
                    sitekey="6LcXAWgdAAAAAGagQ3kY3jaIl_hvb5bSAzl5_VJG"
                    onChange={onCaptchaChange}
                />
                <Box mt={4} mb={2}>
                    <Button
                        onClick={register}
                        disableElevation
                        type="submit"
                        style={{textTransform: "none"}}
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth>
                        {"Далее"}
                    </Button>
                </Box>
            </Box>
        </AuthLayout>
    );

}

const mapStateToProps = ({ auth }) => {
    return {
        loading: auth.loading,
        error: auth.error,
        verificationId: auth.verificationId,
        errorMessage: auth.errorMessage,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerAction: (...args) => {
            dispatch(requestRegister(...args));
        },
        registerFailure: (payload) => {
            dispatch(registerFailure(payload));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);