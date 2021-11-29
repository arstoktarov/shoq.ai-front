import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, FormControl, MenuItem, Select} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import useStyles from "./styles";
import {loadSubjectSelectives, setSubjectSelectives} from "actions/subject-list-actions";
import {connect} from "react-redux";

const SubjectSelectivesSection = (props) => {
    const classes = useStyles();

    const { selectives, selectivesList, loadSelectives, setSelectives, loading } = props;

    const [currentSelectiveId, setCurrentSelectiveId] = useState(null);
    const [currentSelectivePairId, setCurrentSelectivePairId] = useState(null);

    useEffect(() => {
        if (selectives) {
            const { globalId, pair: { globalId: pairGlobalId } } = selectives;
            setCurrentSelectiveId(globalId);
            setCurrentSelectivePairId(pairGlobalId);
        }
        else {
            loadSelectives();
        }
    }, [selectives]);

    const handleSelectivesChange = (event) => {
        if (event.target.value === "not chosen") {
            setCurrentSelectiveId(null);
            setCurrentSelectivePairId(null);
        }
        else {
            setCurrentSelectiveId(event.target.value);
            setCurrentSelectivePairId(null);
        }
    };

    const handlePairsChange = (event) => {
        setSelectives({selectiveId: currentSelectiveId, selectivePairId: event.target.value,});
    }

    const getSelectivePairs = () => {
        if (selectivesList.length > 0 && currentSelectiveId) {
            return selectivesList.find((item) => item.globalId === currentSelectiveId).pairs;
        }
        else return [];
    }

    const checkSelectivesChosen = () => {
        return currentSelectiveId && currentSelectivePairId;
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Typography>Профильные предметы:</Typography>
            <Box display="flex" flexDirection="row">
                <Box ml={3}>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={currentSelectiveId ?? "not chosen"}
                            onChange={handleSelectivesChange}
                            label="Age"
                        >
                            <MenuItem value="not chosen">Не выбрано</MenuItem>
                            {
                                selectivesList.map(({globalId, name}) => (
                                    <MenuItem key={globalId} value={globalId}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box ml={3}>
                    <FormControl className={classes.formControl}>
                        <Select
                            disabled={false}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={currentSelectivePairId ?? "not chosen"}
                            onChange={handlePairsChange}
                            label="Age"
                        >
                            <MenuItem value="not chosen">Не выбрано</MenuItem>
                            {
                                getSelectivePairs().map(({globalId, name}) => (
                                    <MenuItem key={globalId} value={globalId}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}


const mapStateToProps = ({ user, subjectList: { selectives } }) => ({
    selectivesList: selectives.selectivesList,
    selectives: selectives.selectives,
    loading: selectives.loading,
    user: user.user,
});

const mapDispatchToProps = (dispatch) => ({
    loadSelectives: () => dispatch(loadSubjectSelectives()),
    setSelectives: (payload) => dispatch(setSubjectSelectives(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSelectivesSection);