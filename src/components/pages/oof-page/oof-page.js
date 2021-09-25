import React from "react";
import MainLayout from "components/layouts/main-layout";
import {Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "components/mui-customized/Button";
import Typography from "components/mui-customized/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {FlameIcon} from "components/icons/icons";
import {connect} from "react-redux";

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 150,
    },
    infoText: {
        textIndent: "50px",
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "16px",
        color: "#1C242C",
    },
    table: {
        boxShadow: "none",
    },
}));


const StyledTableCell = withStyles(() => ({
    root: {
        borderBottom: "none",
    }
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        borderCollapse: "none",
        '&:nth-of-type(odd)': {
            backgroundColor: "#F7F9FA",
        },
    },
}))(TableRow);

function createData(startTime, results, duration) {
    return { startTime, results, duration };
}

const rows = [
    createData("05.02.2020", "140", "0:24:52"),
    createData("05.02.2020", "140", "0:24:52"),
    createData("05.02.2020", "140", "0:24:52"),
];

const TableTypography = (props) => {
    return (
        <Typography fontSize="12px" color="primary" customVariant="bodyRoboto" {...props}>
            {props.children}
        </Typography>
    );
};

const OOFPage = () => {
    const classes = useStyles();


    return (
        <MainLayout>
            <Box maxWidth="700px" height="100%" borderRight="1px solid #CCD4E1">
                <Box p={3} display="flex" flexDirection="row">
                    <Box display="flex" flexDirection="row" ml="auto" alignItems="center">
                        <Button variant="contained" color="primary" startIcon={<FlameIcon />}>Играть</Button>
                        <Box ml={2}>
                            <Button variant="contained" color="primary" startIcon={<FlameIcon />}>Играть с другом</Button>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <TableContainer component={Box}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography>История игр</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Box display="flex" flexDirection="row" justifyContent="flex-end">
                                            <Typography fontWeight="500" customVariant="subtitleRoboto">
                                                Победы: 3
                                            </Typography>
                                            <Box ml={3}>
                                                <Typography fontWeight="500" customVariant="subtitleRoboto">
                                                    Сыграно игр: 8
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, idx) => (
                                    <StyledTableRow key={idx}>
                                        <StyledTableCell component="th" scope="row">
                                        </StyledTableCell>
                                        <StyledTableCell align="left" component="th" scope="row">
                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                <Avatar src="https://baltic-grlk5lagedl.stackpathdns.com/production/baltic/images/1549357428364401-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=top&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"
                                                        style={{width: "24px", height: "24px"}}/>
                                                <Box ml={1}>
                                                    <TableTypography>
                                                        1234
                                                        <sub>+25</sub>
                                                    </TableTypography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                <TableTypography>
                                                    4
                                                </TableTypography>
                                                <TableTypography>
                                                    -
                                                </TableTypography>
                                                <TableTypography>
                                                    3
                                                </TableTypography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="right" component="th" scope="row">
                                            <Box justifyContent="flex-end" display="flex" flexDirection="row" alignItems="center">
                                                <TableTypography fontWeight={400}>
                                                    Eeoneguy
                                                </TableTypography>
                                                <Box ml={2}>
                                                    <Avatar src="https://baltic-grlk5lagedl.stackpathdns.com/production/baltic/images/1549357428364401-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=top&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"
                                                            style={{width: "24px", height: "24px"}}/>
                                                </Box>
                                                <Box ml={1}>
                                                    <TableTypography>
                                                        1234
                                                        <sub>+25</sub>
                                                    </TableTypography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="right" component="th" scope="row">
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ OOFPage }) => ({
    oof: OOFPage.oof,
    loading: OOFPage.loading,
    error: OOFPage.error,
});

const mapDispatchToProps = () => ({
    loadOOF: () => {},
});


export default connect(mapDispatchToProps, mapStateToProps)(OOFPage);