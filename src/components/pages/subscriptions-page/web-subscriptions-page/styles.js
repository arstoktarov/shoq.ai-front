import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    input: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
    textField: {
        '& ::placeholder': {
            opacity: 1,
            color: "#CCD4E1",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "16px",
        },
    },
}));