import React from 'react';
import {Avatar, Badge, Box, ButtonBase, Typography} from "@material-ui/core";
import CircleBoundary from "components/circle-boundary";
import PropTypes from 'prop-types';
import useStyles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import helpers from "helpers";

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        top: 0,
        right: 0,
        position: "absolute",
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const TrialAnswerItem = (props) => {
    const classes = useStyles(props);

    const {idx, title = '', variant, onClick, answered, answerImage} = props;

    return (
        <ButtonBase style={{position: "relative"}} onClick={onClick} disableTouchRipple classes={{
            root: classes[variant ?? "root"],
        }}>
            <CircleBoundary className={classes.number}>
                <Typography style={{color: "#5B7083", lineHeight: "1"}}>{String.fromCharCode(97 + idx)}</Typography>
            </CircleBoundary>
            <Typography component="div" className={classes.text}><Box dangerouslySetInnerHTML={{__html: helpers.replaceMtag(title)}}/></Typography>
            {
                answered
                ?
                <SmallAvatar src={answerImage}/>
                : ""
            }
        </ButtonBase>
    );

}

TrialAnswerItem.propTypes = {
    idx: PropTypes.number,
    title: PropTypes.any,
    selected: PropTypes.bool,
}

export default TrialAnswerItem;