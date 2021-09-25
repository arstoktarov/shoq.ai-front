import {Box, CircularProgress} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import React from "react";

export default function CircularTimer(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                thickness={6}
                style={{
                    width: "80px",
                    height:"80px",
                    position: "absolute",
                    zIndex: 10,
                }}
                variant="determinate"
                {...props}
            />
            <CircularProgress
                thickness={6}
                style={{
                    width: "80px",
                    height:"80px",
                    color: "#E8F5FE",
                    zIndex: 9,
                }}
                variant="determinate"
                value={100}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                width="80px"
                height="80px"
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography fontSize={28} color="primary" fontFamily="Roboto, Raleway, sans-serif"  component="div">{`${Math.round(
                    props.label,
                )}`}</Typography>
            </Box>
        </Box>
    );
}