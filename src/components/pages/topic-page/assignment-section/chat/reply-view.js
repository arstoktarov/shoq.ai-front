import React from "react";
import {Box, Typography} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";

const ReplyView = ({ text }) => {
    const theme = useTheme();


    return (
        <Box mb={1} display="flex" flexDirection="row" alignItems="center">
            <Box mr={1} borderLeft={`2px solid ${theme.palette.primary.main}`} p={1}>
                <Typography style={{fontWeight: "lighter", overflowWrap: "anywhere"}} color="textSecondary"
                            variant="subtitle1">
                    {text}
                </Typography>
            </Box>
        </Box>
    );
}

export default ReplyView;