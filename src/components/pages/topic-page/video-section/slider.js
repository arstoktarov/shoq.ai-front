import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiSlider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUpRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: "20px",
    },
    margin: {
        height: theme.spacing(3),
    },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const Slider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 35,
        width: 3,
        backgroundColor: '#E0245E',
        marginTop: -7,
        marginLeft: 0,
        borderRadius: 0,
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 20,
        color: "#1DA1F2"
    },
    rail: {
        color: '#E8F5FE',
        opacity: 1,
        height: 20,
    },
})(MuiSlider);

function ThumbComponent(props) {
    return (
        <span {...props}>
            <ArrowDropDownIcon style={{
                marginTop: "-35px",
                marginRight: "-40px",
                color: '#E0245E',
                fontSize: '40px',
            }}/>
            <ArrowDropUpIcon style={{
                marginBottom: "-35px",
                fontSize: '40px',
                color: '#E0245E',
            }}/>
        </span>
    );
}

export default function CustomSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider
                {...props}
                ThumbComponent={ThumbComponent}
            />
        </div>
    );

}