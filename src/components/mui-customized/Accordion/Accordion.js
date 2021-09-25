import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Accordion as MuiAccordion } from "@material-ui/core";

const Accordion = withStyles({
    root: {
        backgroundColor: 'white',
        border: '0.5px solid #CCD4E1',
        borderRadius: '10px',
        marginBottom: '1rem',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
        },
    },
    expanded: {},
})(MuiAccordion);

export default Accordion;