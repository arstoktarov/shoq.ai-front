import {withStyles} from "@material-ui/core/styles";
import {colors} from "constantValues";
import {InputBase} from "@material-ui/core";

const CustomInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& $focused': {
            color: 'white',backgroundColor: "white"
        },
    },
    focused: {backgroundColor: "white"},
    input: {
        textDecoration: "underline",
        position: 'relative',
        fontFamily: "Roboto",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: "0em",
        lineHeight: "1.2",
        padding: "0",
        color: colors.LITTLE_TEXT,
        '&:focus': {
        },
    },
}))(InputBase);
export default CustomInput;