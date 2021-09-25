import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: { // works
            main: '#1DA1F2',
            contrastText: '#ffffff',
        },
        secondary: { // works
            main: '#ff004e',
            contrastText: '#fff',
        },
        mainColor: {
            main: '#1DA1F2',
        },
        lightGrey: { // doesnt work - defaults to a grey button
            main: '#F7F9FA',
            contrastText: '#fff',
        },
        error: { // doesnt work - grey button
            main: '#E0245E',
            contrastText: '#000',
        },
    },
    text: {
        primary: "#fff"
    },
});