import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Link, Typography} from "@material-ui/core";
import TextField from "components/mui-customized/TextField";
import useStyles from "./styles";
import AuthLayout from "components/layouts/auth-layout";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Backdrop from "components/backdrop";
import { login } from "actions/login-actions";

const LoginPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { isAuthenticated, login, errorMessage } = props;

    const [number, setNumber] = useState('+7');
    const [password, setPassword] = useState('');
    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            history.goBack();
        }
    });

    const handleChange = (input) => (event) => {
        const value = event.target.value;
        switch (input) {
            case "number":
                handleNumberChange(value)
                break;
            case "password":
                setPassword(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        login(number, password);
    }

    const handleNumberChange = (value) => {
        let number = value;
        if (number.length < 2 && number !== "+") {
            number = "+7" + number;
        }
        if (!number.startsWith("+7")) {
            number = "+7" + number.substring(2, number.length);
        }
        setNumber(number);
    }

    return (
        <AuthLayout>
            <Backdrop open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box className={classes.brandName}>
                <Typography className={classes.brandText} variant="h6">Shoq.ai Group</Typography>
            </Box>
            <Box mt={15} width="100%">
                <form className={classes.loginForm} onSubmit={handleSubmit}>
                    <Typography variant="h5">Войдите в акккаунт</Typography>
                    <Box mt={4}>
                        <Box>
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
                                value={number}
                                placeholder="Номер телефона"
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
                                onChange={handleChange("password")}
                                value={password}
                                placeholder="Пароль"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box mt={1}>
                            <Typography style={{fontSize: "12px"}} color="secondary">{errorMessage}</Typography>
                        </Box>
                    </Box>
                    <Box mt={4} height="100px">
                        <Box mb={1} display="flex" flexDirection="row" justifyContent="space-between">
                            <Link href={"/usernameLogin"} variant="body2">Войти через имя пользователя</Link>
                        </Box>
                        <Button
                            disableElevation
                            type="submit"
                            style={{textTransform: "none"}}
                            size="large"
                            color="primary"
                            variant="contained"
                            fullWidth>
                            Войти
                        </Button>
                        <Box mt={1} display="flex" flexDirection="row" justifyContent="space-between">
                            <Link href={"/register"} variant="body2">Регистрация</Link>
                            <Link href={"/recovery"} variant="body2">Забыли пароль?</Link>
                        </Box>
                    </Box>
                </form>
            </Box>
        </AuthLayout>
    );
}

const mapStateToProps = ({ login, auth }) => {
    return {
        isAuthenticated: auth.isAuthenticated,
        loading: login.loading,
        error: login.error,
        errorMessage: login.errorMessage,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (number, password) => dispatch(login(number, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);