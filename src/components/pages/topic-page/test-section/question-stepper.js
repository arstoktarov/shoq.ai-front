import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-70% + 5px)',
        right: 'calc(50% + 5px)',
        zIndex: 1,
    },
    active: {
        '& $line': {
            borderColor: '#1DA1F2',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#1DA1F2',
        },
    },
    line: {
        borderColor: '#F7F9FA',
        borderTopWidth: 2,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
    },
    activeIcon: {
        cursor: "pointer",
        width: 10,
        height: 10,
        backgroundColor: '#1DA1F2',
        borderRadius: '50%',
        border: '5px solid white',
        boxShadow: "0px 0px 4px #1DA1F2",
        zIndex: 2
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: '#F7F9FA',
        zIndex: 2,
    },
    failed: {
        cursor: "pointer",
        width: 10,
        height: 10,
        backgroundColor: '#ED2966',
        borderRadius: '50%',
        border: '5px solid white',
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        zIndex: 2
    },
    completed: {
        cursor: "pointer",
        width: 10,
        height: 10,
        backgroundColor: "#7fef7f",
        borderRadius: '50%',
        border: '5px solid white',
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        zIndex: 2
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed, error } = props;

    let icon = (<Box className={classes.circle} />);

    if (active) {
        icon = (<Box className={classes.activeIcon} />);
    }
    else if (error) {
        icon = (<Box className={classes.failed} />);
    }
    else if (completed) {
        icon = (<Box className={classes.completed} />);
    }

    return (
        <div className={clsx(classes.root, {[classes.active]: active,})}>
            {icon}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: "20px",
        padding: "10px",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        overflow: "hidden",
        padding: "10px 1px",
    },
    step: {
        cursor: "pointer",
        paddingLeft: 0,
        paddingRight: '16px',
        marginTop: '20px',
        flex: 0
    },
}));

export default function CustomizedStepper(props) {
    const classes = useStyles();

    const { items = [], onStepClick, currentQuestionId, done, doneSuccess, onDoneClick } = props;

    const onClick = (item) => (e) => {
        onStepClick(item);
    }

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepper} alternativeLabel>
                {
                    items.map((item, key) => {
                        const { answered, isCorrect } = item;
                        return (
                            <Step
                                active={item.id === currentQuestionId}
                                completed={answered}
                                onClick={onClick(item)}
                                key={key}
                                className={classes.step}
                                connector={<QontoConnector />}>
                                    <StepLabel error={answered && !isCorrect} StepIconComponent={QontoStepIcon} />
                            </Step>
                        )
                    })
                }

                <Step
                    active={false}
                    completed={done && doneSuccess}
                    onClick={onDoneClick}
                    className={classes.step}
                    connector={<QontoConnector />}>
                    <StepLabel error={done && !doneSuccess} StepIconComponent={QontoStepIcon} />
                </Step>
            </Stepper>
        </div>
    );
}