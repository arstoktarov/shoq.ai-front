import {createMuiTheme} from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

const darkTheme = createMuiTheme({
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
        },
    },
    palette: {
        type: "dark",
        primary: {
            main: "#FFF",
        },
        secondary: {
            main: '#ccd4e1',
            contrastText: "#FFF",
        },
        action: {
            active: '#ccd4e1',
        },
        text: {
            primary: "#FFF",
            secondary: "#FFF",
        }
    },
});

export default darkTheme;