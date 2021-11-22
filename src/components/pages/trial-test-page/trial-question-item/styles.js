import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    openTextButton: {
        backgroundColor: "white",
        color: theme.palette.text.secondary,
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "1rem",
        "&:hover": {
            backgroundColor: "white",
        }
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalBox: {
        overflowX: "hidden",
        padding: theme.spacing(6),
        minWidth: "40%",
        maxWidth: "60%",
        maxHeight: "70vh",
        backgroundColor: "white",
        borderRadius: "20px",
        overflow: "scroll",
        outline: 0,
    }
}))

//overflow="scroll" minWidth="40%" maxWidth="60%" bgcolor="white" padding={6} borderRadius="50px" style={{outline: 0}}