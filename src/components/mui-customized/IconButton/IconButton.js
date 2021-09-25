import { withStyles } from "@material-ui/core/styles";
import { IconButton as MuiIconButton } from "@material-ui/core";

const IconButton = withStyles({
    root: {
        color: "#CCD4E1"
    },
})(MuiIconButton);

export default IconButton;