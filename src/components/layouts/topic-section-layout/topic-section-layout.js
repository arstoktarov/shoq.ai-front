import {Box} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    primaryText: {
        textIndent: "50px",
    },
    divider: {
        margin: "auto 10px -2px 10px"
    },
});

const TopicSectionLayout = (props) => {
    const classes = useStyles();

    const { title = "Section", subtitle = "Some subtitle" } = props;

    return (
        <Box display="flex" flexDirection="column" mt={5} py={2}>
            <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Typography variant="h6" color="textPrimary" className={classes.primaryText}>
                    {title}
                </Typography>
                <Typography align="center" className={classes.divider}>&bull;</Typography>
                <Typography color="textPrimary" customVariant={"subtitleRoboto"}>
                    {subtitle}
                </Typography>
            </Box>
            <Box mt={2}>
                {props.children}
            </Box>
        </Box>
    );

}

export default TopicSectionLayout;