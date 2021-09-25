import React from "react";
import {TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const CustomTextField = withStyles({
    root: {
        padding: 0,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: "1px solid #CCD4E1",
                borderRadius: "5px",
            },
            '&:hover fieldset': {
            },
            '&.Mui-focused fieldset': {
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: "13px 14px",
        },
        '& ::placeholder': {
            opacity: 1,
            color: "#CCD4E1",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "16px",
        },
    },
})(TextField);

export default CustomTextField;