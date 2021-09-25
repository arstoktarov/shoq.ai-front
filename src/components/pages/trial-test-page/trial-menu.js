import React, {useState} from "react";
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Box, Button, ButtonBase
} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import {makeStyles, useTheme, withStyles} from "@material-ui/core/styles";
import { colors } from "constantValues";
import {loadTrialTest, trialRunning} from "actions/trial-test-actions";
import {connect} from "react-redux";

const Accordion = withStyles((theme) => ({
    root: {
        overflow: "hidden",
        borderRadius: "10px 10px 10px 10px",
        boxShadow: 'none',
        borderBottom: "1px solid #e7ecf5",
        borderLeft: "1px solid #e7ecf5",
        borderRight: "1px solid #e7ecf5",
        '&:not(:last-child):not(:first-child)': {
            borderRadius: "0 0 0 0",
        },
        '&:first-child': {
            borderTop: "1px solid #e7ecf5",
            borderRadius: "10px 10px 0 0",
        },
        '&:last-child': {
            border: "1px solid #e7ecf5",
            borderRadius: "0 0 10px 10px",
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
    root: {
        backgroundColor: "#E8F5FE",
        color: colors.LITTLE_TEXT,
        marginBottom: -1,
        minHeight: 42,
        '&$expanded': {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            minHeight: 42,
        },
    },
    content: {
        margin: "0",
        justifyContent: "center",
        '&$expanded': {
            margin: "0"
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: "white",
        padding: theme.spacing(1),
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    arrowRight: {
        "background-color": theme.palette.secondary.main,
        "height": "10px",
        "width": "10px",
        "right": "-4px",
        "top": "-4px",
        "position": "absolute",
        "-webkit-transform": "rotate(-45deg)",
    },
    littleDot: {
        "background-color": "white",
        "height": "5px",
        "width": "5px",
        left: "2px",
        top: "2px",
        "position": "absolute",
        borderRadius: "50%",
    },
    bottomLine: {
        "background-color": colors.LITTLE_TEXT,
        "height": "10px",
        "width": "100%",
        "right": "0",
        "left" : "0",
        "bottom": "-5px",
        "position": "absolute",
    },
}))

const TrialMenu = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const { trialFinished, headers = [], onCellClick, onShowResultsClick } = props;

    const [expanded, setExpandedSection] = useState(`panel_${0}`);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpandedSection(newExpanded ? panel : false);
    };

    const handleCellClick = (cell) => (event) => {
        onCellClick(cell);
    }

    return (
        <Box p={3} minHeight="1000px" minWidth="200px" borderRight="1px solid #CCD4E1">
            <Box position="sticky" top="80px">
                <Box>
                    {
                        trialFinished
                            ? <Button onClick={onShowResultsClick} style={{textTransform: "none"}} variant="contained" color="primary" fullWidth>Результаты</Button>
                            : ""
                    }
                </Box>
                <Box mt={2}>
                    {
                        headers.sort((a, b) => a.order - b.order).map((header, idx) => (
                            <Accordion key={header.key} expanded={expanded === `panel_${idx}`} onChange={handleChange(`panel_${idx}`)}>
                                <AccordionSummary>
                                    <Box display="flex" flexDirection="row" alignItems="center">
                                        <Typography>{header.key}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box width="180px" display="flex" flexDirection="row" flexWrap="wrap">
                                        {
                                            header.cells.map((cell, idx) => (
                                                <Box key={cell.id} flexBasis="20%">
                                                    {
                                                        <ButtonBase onClick={handleCellClick(cell)} disableTouchRipple style={{padding: 0}}>
                                                            <Box
                                                                position="relative"
                                                                display="flex"
                                                                flexDirection="column"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                                margin="5px"
                                                                borderRadius="5px"
                                                                width="25px"
                                                                height="25px"
                                                                bgcolor={cell.isCurrent ? theme.palette.primary.main : "#E8F5FE"}
                                                                color={cell.isCurrent ? "white" : colors.LITTLE_TEXT}
                                                                overflow="hidden"
                                                            >
                                                                {
                                                                    cell.isMarked ? <Box className={classes.arrowRight}/> : ""
                                                                }
                                                                {
                                                                    cell.isAnswered ? <Box className={classes.bottomLine}/> : ""
                                                                }
                                                                <Typography
                                                                    color="inherit"
                                                                    customVariant="subtitleRoboto"
                                                                    fontWeight="500">
                                                                    {(idx+1)}
                                                                </Typography>
                                                            </Box>
                                                        </ButtonBase>
                                                    }
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
}

export default TrialMenu;