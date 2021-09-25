import React from 'react';
import {Box, Button, IconButton as MuiIconButton} from "@material-ui/core";
import TextField from "components/mui-customized/TextField";
import useStyles from "./styles";
import { colors } from 'constantValues';
import {withStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Typography from "components/mui-customized/Typography";

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

export default function RegisterStep(props) {
    const classes = useStyles();
    const history = useHistory();
    const { values: { fullname, username, password, passwordRepeat, phone, grade } } = props;
    const { setValueOf, onSubmit, grades } = props;

    const handleChange = (input) => (event) => {
        setValueOf(input)(event.target.value);
    }

    const handleGradeClick = (value) => {
        setValueOf("grade")(value);
    }

    return (
        <form className={classes.loginForm} onSubmit={onSubmit}>
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
    );

}