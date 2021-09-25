import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
    root: {
        right: 0,
        top: 0,
        backgroundColor: "#E8F5FE",
        width: "100vw",
        maxHeight: "100vh",
    },
    form: {
        padding: "30px 70px 0 70px",
        position: "relative",
        opacity: 1,
        maxWidth: "450px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2,
        left: 0,
        top: 0,
        boxSizing: "border-box",
        backgroundColor: "white",
    },
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
});