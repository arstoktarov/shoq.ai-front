import {makeStyles} from "@material-ui/core/styles";
import PremiumBackground from "svg/premium-bg.svg";

export default makeStyles((theme) => ({
    root: {},
    subscription: (props) => ({
        display: "flex",
        flexDirection: "column",
        maxWidth: "250px",
        backgroundColor: "#F7F9FA",
        boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
        boxSizing: "border-box",
        position: "relative",
        backgroundImage: props.premium ? `url(${PremiumBackground})` : "",
        backgroundRepeat: props.premium ?"no-repeat" : "",
        backgroundPosition: props.premium ?"right" : "",
    }),
    hot: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        transform: "rotate(0.125turn)",
        position: "absolute",
        backgroundColor: theme.palette.primary.main,
        right: "-100px",
        top: "10px",
        width: "100%",
        height: "20px",
    },
    input: {
        fontFamily: "Roboto, Arial, sans-serif"
    },
    buyButton: {
        fontFamily: "Roboto, Raleway",
        fontSize: "14px",
        padding: "10px 14px",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        textTransform: "none",
    },
}));