import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import ReactCodeInput from "react-code-input";
import {colors} from "constantValues";
import useStyles from "./styles";
import typography from "components/styles/typography";
import {useHistory} from "react-router-dom";

export default function CheckCodeStep(props) {
    const classes = useStyles();
    const history = useHistory();

    const { code, setValueOf } = props;

    return (
        <form className={classes.loginForm}>
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
                            }} name={"asd"} fields={4} value={code} onChange={setValueOf("code")} inputMode={"numeric"}/>
                        </Box>
                    </Box>
                </form>
    );

}