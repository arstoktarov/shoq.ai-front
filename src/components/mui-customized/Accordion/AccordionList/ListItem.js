import {withStyles} from "@material-ui/core/styles";
import {ListItem as MuiListItem} from "@material-ui/core";


const ListItem = withStyles({
    root: {
        //borderRight: '0.5px solid #CCD4E1',
        //borderLeft: '0.5px solid #CCD4E1',
        borderBottom: '0.5px solid #CCD4E1',
        '&:last-child': {
            borderBottom: 'none',
            borderRadius: "0 0 9px 9px"
        },
        display: "flex",
    },
})(MuiListItem);

export default ListItem;