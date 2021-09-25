import MuiListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";

const ListItemText = withStyles({
    root: {
        fontFamily: "Raleway, Roboto",
        fontWeight: 700,
        fontSize: "16px",
    },
})(MuiListItemText);

export default ListItemText;