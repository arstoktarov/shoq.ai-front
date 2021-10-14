import {withStyles} from "@material-ui/core/styles";
import {Select} from "@material-ui/core";

const CustomSelect = withStyles(() => ({
    root: {
    },
    icon: {
        display: "none",
    },
}))(Select);
export default CustomSelect;