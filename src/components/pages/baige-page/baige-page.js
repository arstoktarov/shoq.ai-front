import React from "react";
import { Avatar, Box, IconButton, } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MainLayout from "components/layouts/main-layout";
import Typography from "components/mui-customized/Typography";
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import FilledIconButton from "components/mui-customized/FilledIconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "800px",
        borderRadius: 0,
        boxShadow: "none",
        height: "100%",
        borderRight: "1px solid #CCD4E1",
        backgroundColor: "#F7F9FA",
    },
    card: {
        backgroundColor: "white",
        marginBottom: "10px",
        borderRadius: 0,
        borderBottom: "1px solid #CCD4E1",
        borderTop: "1px solid #CCD4E1",
        overflow: "hidden",
        //padding: "24px 24px 48px 24px"
    },
    baigeDay: {
        width: "180px",
        height: "247px",
        //boxSizing: "border-box",
        padding: "18px 18px 24px 18px",
        background: "#E8F5FE",
        borderRadius: "10px",
        margin: "0 12px 0 0",
        flexShrink: "0",
    },
}));

const BaigePage = () => {
    const classes = useStyles();

    return (
        <MainLayout>
            <Box className={classes.root}>
                <Box className={classes.card}>
                    <Box display="flex" flexDirection="row" px={3} pt={3} pb={3}>
                        <Box display="flex" flexDirection="row">
                            <Typography>Байге</Typography>
                            <Box mx={0.5}>
                                <Typography align="center" className={classes.divider}>&bull;</Typography>
                            </Box>
                            <Typography fontSize="1rem" htmlcolor="#ED2966"> вы учавствуете</Typography>
                        </Box>
                        <Box ml="auto" mr={3}>
                            <FilledIconButton style={{padding: 0, color: "#E8F5FE", backgroundColor: "#1DA1F2"}} variant="outlined"><HelpRoundedIcon /></FilledIconButton>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.card}>
                    <Box display="flex" flexDirection="row" px={3} pt={3} pb={3} mt={1}>
                        {
                            [1,2,3,4,5].map((item) => (
                                <Box key={item} className={classes.baigeDay}>
                                    <Box height="100%" width="100%" display="flex" flexDirection="column" justifyContent="space-between">
                                        <Box>
                                            <Typography fontSize="24px">Пн</Typography>
                                        </Box>
                                        <Box>
                                            <Box width="100%" bottom="30px" display="flex" flexDirection="row">
                                                <Typography fontSize="18px">Уроки</Typography>
                                                <Box ml="auto">
                                                    <Typography fontSize="18px">2</Typography>
                                                </Box>
                                            </Box>
                                            <Box mt={1} width="100%" bottom="30px" display="flex" flexDirection="row">
                                                <Typography fontSize="18px">Игры</Typography>
                                                <Box ml="auto">
                                                    <Typography fontSize="18px">10</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box mt={2} display="flex" flexDirection="row" px={3} pb={6}>
                        <Box>
                            <Typography fontFamily="Roboto" fontSize="48px" lineHeight="0.8">143</Typography>
                        </Box>
                        <Box ml={2} display="flex" flexDirection="row" alignItems="flex-end">
                            <Typography fontSize="24px" lineHeight="0.9">балл за неделю</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.card}>
                    <Box pt={3} pb={3}>
                        <Box px={3}>
                            <Typography fontSize="24px">Лидеры прошлой недели</Typography>
                        </Box>
                        <Box mt={2}>
                        {
                            [1,2,3,4].map((item) => (
                                <Box key={item} borderBottom="1px solid #CCD4E1" px={4} py={2} display="flex" flexDirection="row" alignItems="center">
                                    <Avatar
                                        style={{width: "50px", height: "50px"}}
                                    />
                                    <Box ml={2}>
                                        <Typography fontSize="16px" fontWeight="700px">Нуртай Жандос</Typography>
                                        <Typography customVariant="subtitleRoboto">@nurtaims</Typography>
                                    </Box>
                                </Box>
                            ))
                            
                        }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );

}

export default BaigePage;