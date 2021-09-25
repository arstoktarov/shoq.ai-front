import React from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import {withStyles} from "@material-ui/core/styles";
import useStyles from "./styles";

const StyledTableCell = withStyles((theme) => ({
    root: {
        borderBottom: "none",
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        borderCollapse: "none",
        '&:nth-of-type(even)': {
            backgroundColor: "#F7F9FA",
        },
    },
}))(TableRow);

const TrialResultView = (props) => {
    const classes = useStyles();

    const { result = {} } = props;
    const { detail = [], point = 0, maxPoint = 140 } = result;

    return (
        <Box mt={5}>
            <TableContainer component={Box}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableBody>
                        <StyledTableRow style={{width: "50%"}}>
                            <StyledTableCell width="50%" align="right">
                                <Typography fontWeight="600" customVariant="littleTextRoboto">
                                    Ваш результат
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Typography fontWeight="600" customVariant="subtitleRoboto">
                                    {point}/{maxPoint}
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                        {
                            detail.map((item) => (
                                <StyledTableRow key={item.subjectName} style={{width: "50%"}}>
                                    <StyledTableCell align="right">
                                        <Typography fontWeight="600" customVariant="littleTextRoboto">
                                            {item?.subjectName}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Typography fontWeight="600" customVariant="subtitleRoboto">
                                            {item.point}/{item.maxPoint}
                                        </Typography>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}

export default TrialResultView;