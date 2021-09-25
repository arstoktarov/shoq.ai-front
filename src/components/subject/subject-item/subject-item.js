import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, LinearProgress} from "@material-ui/core";
import {InfoIcon} from "components/icons";
import BackgroundSvg from "svg/image.svg";
import { colors } from "constantValues";
import Typography from "components/mui-customized/Typography";
import PropTypes from "prop-types";

const BorderLinearProgress = withStyles(() => ({
    root: {
        height: 6,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: colors.LITTLE_TEXT,
    },
    bar: {
        borderRadius: 5,
    },
}))(LinearProgress);

const useStyles = makeStyles({
    subjectItem: {
        width: "270px",
        height: "94.67px",
        backgroundColor: "#0e2537",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        color: "white",
        userSelect: "none",
        position: "relative",
        overflow: "hidden",
        background: `no-repeat center/110% url(${BackgroundSvg})`,
    },
    title: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
});

const SubjectItem = (props) => {
    const classes = useStyles();

    const {
        title,
        title2="12/30",
        supTitle="KZ",
        progressValue = 90,
        subtitle = "Средняя оценка",
        subtitle2 = "15%",
        onClick,
        onInfoClick
    } = props;

    const handleBoxClick = () => {
        if (onClick) onClick();
    }

    const handleInfoButtonClick = (event) => {
        event.stopPropagation();
        if (onInfoClick) onInfoClick();
    }

    return (
        <Box py={1} px={2} onClick={handleBoxClick} className={classes.subjectItem}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography className={classes.title} variant="h5">
                    {title}
                </Typography>
                <Box justifyContent="flex-end" display="flex" alignItems="center">
                    <ButtonBase onClick={handleInfoButtonClick}>
                        <InfoIcon />
                    </ButtonBase>
                </Box>
            </Box>
            <Box mt={0.5} display="flex" flexDirection="column">
                <Typography htmlcolor="white" customVariant="subtitleRoboto" style={{marginLeft: "auto"}}>{title2}</Typography>
                <Box mt={0.5}>
                    <BorderLinearProgress variant="determinate" value={progressValue}/>
                </Box>
                <Box mt={1} display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography variant="subtitle2">{subtitle}</Typography>
                    <Typography htmlcolor="white" customVariant="subtitleRoboto">{subtitle2}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

SubjectItem.propTypes = {
    title: PropTypes.string,
    title2: PropTypes.string,
    supTitle: PropTypes.string,
    progressValue: PropTypes.number,
    subtitle: PropTypes.string,
    subtitle2: PropTypes.string,
    onClick: PropTypes.any,
    onInfoClick: PropTypes.any,
}

export default SubjectItem;