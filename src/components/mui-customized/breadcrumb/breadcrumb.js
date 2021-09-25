import React from 'react';
import {Box, Button} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "components/mui-customized/Typography";

const useStyles = makeStyles((theme) => ({
    body: {
        display: "flex",
        alignItems: "center",
        height: (props) => props.height ?? "",
    },
    button: {
        height: "100%",
        textTransform: "none",
        fontSize: "1rem",
    },
    primaryText: {
        marginRight: '10px'
    },
    secondaryTextBox: {
        display: "flex",
    },
    divider: {
        margin: "auto 10px auto 10px"
    },
    secondaryText: {
        marginTop: "auto", marginBottom: "auto"
    },
    littleText: {
        lineHeight: 1,
        color: '#5B7083',
        fontSize: '14px',
        fontWeight: "lighter",
    },
}));

const Breadcrumb = (props) => {
    const classes = useStyles();
    const { primaryText, secondaryText, onClick } = props;

    const secondaryTextBox = (
        <React.Fragment>
            <Typography align="center" className={classes.divider}>&bull;</Typography>
            <Typography align="left" customVariant="subtitleRoboto">
                {secondaryText}
            </Typography>
        </React.Fragment>
    );

    return (
        <Box height={props.height} className={classes.body}>
            <Button disableElevation disableRipple onClick={onClick} size="large" variant="text" className={classes.button} startIcon={<ArrowBackIcon color="primary" />}>
                <Typography style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} variant="h6">
                    {primaryText}
                </Typography>
                {secondaryText ? secondaryTextBox : null}
            </Button>
        </Box>
    );

}

export default Breadcrumb;