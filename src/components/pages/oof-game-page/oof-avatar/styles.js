import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        border: "2px solid #CCD4E1",
    },
    root: {
        userSelect: "none",
    },
}));