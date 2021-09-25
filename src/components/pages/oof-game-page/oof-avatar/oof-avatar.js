import React from "react";
import {Avatar, Box} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";

import useStyles from "./styles";

export default function OOFAvatar(props) {
    const classes = useStyles();
    const { label } = props;

    return (
        <Box className={classes.root} display="flex" flexDirection="column" alignItems="center">
            <Avatar
                src="https://baltic-grlk5lagedl.stackpathdns.com/production/baltic/images/1549357428364401-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=top&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"
                className={classes.avatar}
            />
            <Box mt={2}>
                <Typography fontWeight="400">
                    {label}
                </Typography>
            </Box>
        </Box>
    );

}