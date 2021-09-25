import { colors } from "constantValues";
import {makeStyles} from "@material-ui/core/styles";

const typography = makeStyles({
    littleText: {
        fontFamily: "Raleway",
        fontWeight: "600",
        color: colors.LITTLE_TEXT
    }
});

export default typography;