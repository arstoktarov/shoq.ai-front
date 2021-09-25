import { withStyles } from "@material-ui/core/styles";
import { List as MuiList } from "@material-ui/core";

const List = withStyles({
    root: {
        paddingTop: 0,
    },
})(MuiList);

export default List;