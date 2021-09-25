import React from "react";
import MuiTypography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { colors } from "constantValues";

const useStyles = makeStyles((theme) => {
    return {
        root: (props) => ({
            color: props.htmlcolor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            fontStyle: props.fontStyle,
            fontWeight: props.fontWeight,
            letterSpacing: props.letterSpacing,
        }),
        title1: {
            fontFamily: "Raleway",
            fontWeight: "700",
            fontStyle: "normal",
            fontSize: "16px",
            color: "black",
        },
        bodyRobotoGray: {
            color: colors.LITTLE_TEXT,
            fontFamily: "Roboto",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
            letterSpacing: "0em",
        },
        bodyRoboto: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
        },
        subtitleRoboto: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            letterSpacing: "0em",
        },
        littleTextRoboto: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            letterSpacing: "0em",
            lineHeight: "1.2",
            color: colors.LITTLE_TEXT,
        },
        subtitleRaleway: {
            fontFamily: "Raleway",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            letterSpacing: "0em",
            color: colors.LITTLE_TEXT,
        },
    }
});

export default function Typography({className, customVariant, ...props}) {
    const classes = useStyles(props);

    return <MuiTypography {...props} className={`${classes[customVariant] ?? ""} ${classes.root ?? ""} ${className ?? ""}`} />
}

Typography.propTypes = {
    className: PropTypes.any,
    customVariant: PropTypes.string,
};
