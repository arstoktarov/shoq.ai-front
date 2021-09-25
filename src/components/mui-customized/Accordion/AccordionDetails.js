import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {AccordionDetails as MuiAccordionDetails} from "@material-ui/core";

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: 0,
    },
}))(MuiAccordionDetails);

export default AccordionDetails;