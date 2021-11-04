import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Link, Typography} from "@material-ui/core";
import TextField from "components/mui-customized/TextField";
import useStyles from "./styles";
import AuthLayout from "components/layouts/auth-layout";
import apiService from "services/api-service";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Backdrop from "components/backdrop";

const UsernameLoginPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState('dendereden');
    const [password, setPassword] = useState('123456');
    const [errorMessage, setErrorMessage] = useState("");
    const [backdropOpen, setBackdropOpen] = useState(false);

    const { isAuthenticated } = props;

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    });

    const handleChange = (input) => (event) => {
        const value = event.target.value;
        setErrorMessage("");
        switch (input) {
            case "username":
                setUsername(value)
                break;
            case "password":
                setPassword(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBackdropOpen(true);
        try {
            const response = await apiService.loginWithUsername(username, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('access_token', response.data.token);
            setBackdropOpen(false);
            history.push('/');
            console.log(localStorage.getItem('user'));
        }
        catch (e) {
            setBackdropOpen(false);
            setErrorMessage(e.message);
            console.error(e);
        }
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
                                name="username"
                                onChange={handleChange("username")}
                                value={username}
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
                            <Link href={"/login"} variant="body2">Войти через номер телефона</Link>
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

const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
        errorMessage: auth.errorMessage,
    };
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(UsernameLoginPage);