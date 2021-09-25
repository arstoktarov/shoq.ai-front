import React from 'react';
import Radio from '@material-ui/core/Radio';
import {withStyles} from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

const PercentageRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default PercentageRadio;