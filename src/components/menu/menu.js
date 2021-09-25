import React from 'react';
import {List} from './List';
import {Box} from "@material-ui/core";
import {makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import defaultTheme from "components/themes/default-theme";
import {ApiServiceProvider} from "components/api-service-context";
import ralewayTheme from "components/themes/raleway-theme";

const useStyles = makeStyles({
    root: {
        top: 0,
        position: "sticky",
        gridArea: "sidebar",
        zIndex: "4",
        opacity: 1,
        backgroundColor: "white",
        whiteSpace: "nowrap",
    }
});

const Menu = (props) => {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={ralewayTheme}>
            <Box className={classes.root} minHeight="1000px" borderRight="1px solid #CCD4E1">
                <Box top="56px" position="sticky" color="black">
                    <List>
                        {props.children}
                    </List>
                </Box>
            </Box>
        </MuiThemeProvider>
    );
}

export default Menu;