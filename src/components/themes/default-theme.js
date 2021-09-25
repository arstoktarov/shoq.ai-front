import {createMuiTheme} from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";
import { colors } from "constantValues";

const defaultTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Raleway',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        lineHeight: 1,
        fontWeightRegular: 700,
        fontWeightLight: 500,
        fontWeightBold: 900,
        h6: {
            fontSize: 18,
            fontWeight: "bolder",
            lineHeight: 1.3,
        },
        subtitle1: {
            fontSize: 14,
            color: colors.LITTLE_TEXT,
        },
        subtitle2: {
            lineHeight: 1.2,
            wordWrap: "break-word",
        },
    },
    palette: {
        primary: {
            main: "#1DA1F2",
            contrastText: "#FFF"
        },
        secondary: {
            main: '#E0245E',
            contrastText: "#FFF",
        },
        action: {
            active: '#ccd4e1',
            light_grey: '#F7F9FA',
        },
        text: {
            primary: "#1C242C",
            secondary: "#5B7083",
        },
        error: {
            main: "#E0245E",
        },
    },
    overrides: {
        MuiInput: {
            input: {
                "&::placeholder": {
                    fontWeight: "lighter",
                },
            }
        }
    }
});

export default defaultTheme;
