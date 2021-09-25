import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {AccordionSummary as MuiAccordionSummary} from "@material-ui/core";

const AccordionSummary = withStyles({
    root: {
        minHeight: '64px',
        justifyContent: "center",
        textTransform: "none",
        '&$expanded': {
            minHeight: '64px',
            background: '#F7F9FA',
            borderRadius: '10px 10px 0 0',
            borderBottom: '0.5px solid #CCD4E1',
        },
    },
    content: {
        margin: '0 0',
        padding: '5px',
        '&$expanded': {
            margin: '0 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export default AccordionSummary;