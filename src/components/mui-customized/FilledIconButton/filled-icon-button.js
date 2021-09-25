import {withStyles} from "@material-ui/core/styles";
import {colors} from "constantValues";
import {IconButton as MuiIconButton} from "@material-ui/core";

const FilledIconButton = withStyles({
    root: {
        backgroundColor: colors.LIGHT_BLUE,
        '&:hover': {
            backgroundColor: colors.LIGHT_BLUE,
        }
    },

})(MuiIconButton);

export default FilledIconButton;