import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Box, ButtonBase, LinearProgress, Popover} from "@material-ui/core";
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

const useStyles = makeStyles( (theme) =>({
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
    hot: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        transform: "rotate(0.125turn)",
        position: "absolute",
        backgroundColor: theme.palette.primary.main,
        right: "-130px",
        top: "10px",
        width: "100%",
        height: "20px",
        fontSize: "11px",
    },
}));

const SubjectItem = (props) => {
    const classes = useStyles();

    const {
        title,
        title2="12/30",
        supTitle="KZ",
        progressValue = 90,
        isBought = false,
        infoPayment = null,
        subtitle = "Средняя оценка",
        subtitle2 = "15%",
        onClick,
        onInfoClick
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleBoxClick = () => {
        if (onClick) onClick();
    }

    const handleInfoButtonClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        if (onInfoClick) onInfoClick();
    }

    const hitUI = () => {
        return (
            <Box zIndex="1" position="absolute" top="0" left="0" height="100%" width="100%" overflow="hidden">
                <Box className={classes.hot} width="100%">
                    <Typography fontSize="inherit" htmlcolor="white">Пробный</Typography>
                </Box>
            </Box>
        );
    }

    const getFullDateString = (date) => {
        const options = {
            year: 'numeric', month: 'long', day: 'numeric'
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    const subscriptionInfos = infoPayment?.subscriptionInfos ?? [];

    return (
        <Box py={1} px={2} onClick={handleBoxClick} className={classes.subjectItem}>
            {
                !isBought ?
                    hitUI()
                : ""
            }
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography className={classes.title} variant="h5">
                    {title}
                </Typography>
                {
                    isBought ?
                    <Box justifyContent="flex-end" display="flex" alignItems="center">
                        <ButtonBase onClick={handleInfoButtonClick}>
                            <InfoIcon />
                        </ButtonBase>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box minWidth="" p={2}>
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Box mr={2} justifySelf="flex-start">
                                        <Typography>Подписка</Typography>
                                    </Box>
                                    <Box ml="auto">
                                        <Typography customVariant="littleTextRoboto">Доступно до:</Typography>
                                    </Box>
                                </Box>
                                {
                                    subscriptionInfos.map(({title, expireTime}, idx) => (
                                        <Box key={idx} mt={1} display="flex" flexDirection="row" alignItems="center">
                                            <Box mr={3} justifySelf="flex-start">
                                                <Typography>{title}</Typography>
                                            </Box>
                                            <Box ml="auto">
                                                <Typography customVariant="littleTextRoboto">{getFullDateString(new Date(expireTime))}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Popover>
                    </Box>
                    : ""
                }
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