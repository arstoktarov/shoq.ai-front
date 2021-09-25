import {makeStyles} from "@material-ui/core/styles";
import { colors } from "constantValues";

export default makeStyles((theme) => ({
    brandName: {
        width: "100%",
    },
    brandText: {
        width: "100%",
        textAlign: "left",
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
    },
    iconButton: {
        color: "#5B7083",
        '&$disabled': {
            color: "black",
            backgroundColor: colors.LIGHT_BLUE,
        },
    },
    disabledIconButton: {
        color: "black",
        backgroundColor: colors.LIGHT_BLUE,
    },
    input: {
        fontFamily: "Roboto, Arial, sanf-serif",
    }
}));