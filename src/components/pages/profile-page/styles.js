import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: "800px",
        borderRadius: 0,
        boxShadow: "none",
        height: "100%",
        borderRight: "1px solid #CCD4E1",
        backgroundColor: "#F7F9FA",
    },
    card: {
        backgroundColor: "white",
        marginBottom: "10px",
        borderRadius: 0,
        borderBottom: "1px solid #CCD4E1",
        borderTop: "1px solid #CCD4E1",
    },
    media: {
        height: "200px",
        backgroundImage: ({media}) => (`url("${media}")`),
    },
    avatar: {
        width: "100%",
        height: "100%",
        border: "4px solid #FFFFFF",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
    },
    input: {
        fontFamily: "Roboto, Arial, sans-serif"
    },
    button: {
    },
}));