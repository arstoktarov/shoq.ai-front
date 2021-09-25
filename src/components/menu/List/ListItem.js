import MuiListItem from "@material-ui/core/ListItem";
import {withStyles} from "@material-ui/core/styles";

const ListItem = withStyles((theme) => ({
    root: {
        paddingRight: "30px",
    },
    selected: {
        backgroundColor: "transparent !important",
        color: theme.palette.primary.main,
    },
}))(MuiListItem);

export default ListItem;