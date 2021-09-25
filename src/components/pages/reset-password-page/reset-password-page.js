import React, {useState} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import typographyStyles from "components/styles/typography";
import useStyles from "./styles";
import AuthLayout from "components/layouts/auth-layout";
import TextField from "components/mui-customized/TextField";
import {useHistory} from "react-router-dom";
import apiService from "services/api-service";
import {connect} from "react-redux";

const ResetPasswordPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const typography = typographyStyles();

    const { verificationId } = props;

    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleChange = (input) => (event) => {
        const value = event.target.value;
        switch (input) {
            case "password":
                setPassword(value);
                break;
            case "password_repeat":
                setPasswordRepeat(value);
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === passwordRepeat && verificationId) {
            const {statusCode, data} = await apiService.resetPassword(verificationId, password);
            if (statusCode === 1000) {
                console.log("successfully changed password");
                history.push("/login");
            }
        }
        else {
            console.error("problem here");
        }
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
                        <Typography className={typography.littleText}>Введите новый пароль</Typography>
                        <Box mt={2}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                value={password}
                                onChange={handleChange("password")}
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                variant="outlined"
                                fullWidth
                            />
                            <Box mt={1}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.input,
                                    }
                                }}
                                value={passwordRepeat}
                                onChange={handleChange("password_repeat")}
                                name="password_repeat"
                                type="password"
                                placeholder="Повторите пароль"
                                variant="outlined"
                                fullWidth
                            />
                            </Box>
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
        verificationId: auth.recoveryVerificationId,
    }
};

export default connect(mapStateToProps, null)(ResetPasswordPage);