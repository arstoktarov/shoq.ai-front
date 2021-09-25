import {withStyles} from "@material-ui/core/styles";
import {List as MuiList} from "@material-ui/core";


const List = withStyles({
    root: {
        padding: '0',
        width: '100%',
    },
})(MuiList);

export default List;