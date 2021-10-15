import React, {useEffect, useState} from "react";
import {Backdrop, Box, CircularProgress, FormControl, MenuItem, Select} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import useStyles from "./styles";
import {getTrialPage, loadSelectives, setSelectives} from "actions/trial-initial-page-actions";
import {connect} from "react-redux";

const SelectivesSection = (props) => {
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
        console.log(event.target.value);
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
            console.log(currentSelectiveId);
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
            <Box ml="auto" display="flex" flexDirection="row">
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


const mapStateToProps = ({ user, selectivesReducer }) => ({
    selectivesList: selectivesReducer.selectivesList,
    selectives: selectivesReducer.selectives,
    loading: selectivesReducer.loading,
    user: user.user,
});

const mapDispatchToProps = (dispatch) => ({
    loadSelectives: () => dispatch(loadSelectives()),
    setSelectives: (payload) => dispatch(setSelectives(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectivesSection);