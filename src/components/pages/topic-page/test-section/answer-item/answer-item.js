import React from 'react';
import {Box, ButtonBase, Typography} from "@material-ui/core";
import CircleBoundary from "components/circle-boundary";
import PropTypes from 'prop-types';
import useStyles from "./styles";
import helpers from "helpers";


const AnswerItem = (props) => {
    const classes = useStyles(props);

    const {idx, title = '', titleComponent, variant} = props;

    return (
        <ButtonBase {...props} disableTouchRipple classes={{
            root: classes[variant ?? "root"],
        }}>
                <CircleBoundary className={classes.number}>
                    <Typography style={{color: "#5B7083", lineHeight: "1"}}>{String.fromCharCode(97 + idx)}</Typography>
                </CircleBoundary>
                {
                    titleComponent ?? <Typography className={classes.text}><Box dangerouslySetInnerHTML={{__html: helpers.replaceMtag(title)}}/></Typography>
                }
        </ButtonBase>
    );

}

AnswerItem.propTypes = {
    idx: PropTypes.number,
    title: PropTypes.any,
    selected: PropTypes.bool,
}

export default AnswerItem;