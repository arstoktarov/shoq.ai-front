import React from "react";
import {Box, MenuItem} from "@material-ui/core";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CustomSelect from "./custom-select";
import CustomInput from "./custom-input";
import {connect} from "react-redux";
import {selectiveChanged, selectivePairChanged} from "actions/subscriptions-page-actions";

const SelectableSubjects = (props) => {
    const {
        selectives,
        selectiveId,
        selectivePairId,
        selectiveChanged,
        selectivePairChanged,
    } = props;

    const [firstSelectOpen, setFirstSelectOpen] = React.useState(false);
    const [secondSelectOpen, setSecondSelectOpen] = React.useState(false);

    const handleSelectivesChange = (event) => {
        if (event.target.value === "not chosen") {
            selectiveChanged(null);
            selectivePairChanged(null);
        }
        else {
            selectiveChanged(event.target.value);
            selectivePairChanged(null);
        }
    };
    const handlePairsChange = (event) => {
        selectivePairChanged(event.target.value);
    }
    const getSelectivePairs = () => {
        if (selectives.length > 0 && selectiveId) {
            const { pairs } = selectives.find(({globalId}) => globalId === selectiveId);
            return pairs;
        }
        else return [];
    }

    return (
        <React.Fragment>
            <Box mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                <Box mr={1}>
                    <CheckCircleRoundedIcon color="primary" style={{width: 12, height: 12}} fontSize="small"/>
                </Box>
                <CustomSelect
                    input={<CustomInput />}
                    labelId="select-1-subject"
                    id="select-1-subject-select"
                    open={firstSelectOpen}
                    onClose={() => setFirstSelectOpen(false)}
                    onOpen={() => setFirstSelectOpen(true)}
                    value={selectiveId ?? "not chosen"}
                    onChange={handleSelectivesChange}
                >
                    <MenuItem value="not chosen">Не выбрано</MenuItem>
                    {
                        selectives.map(({globalId, name}) => (
                            <MenuItem key={globalId} value={globalId}>{name}</MenuItem>
                        ))
                    }
                </CustomSelect>
            </Box>
            <Box mt={1} display="flex" flexDirection="row" alignContent="center" alignItems="center">
                <Box mr={1}>
                    <CheckCircleRoundedIcon color="primary" style={{width: 12, height: 12}} fontSize="small"/>
                </Box>
                <CustomSelect
                    input={<CustomInput />}
                    labelId="select-1-subject"
                    id="select-1-subject-select"
                    open={secondSelectOpen}
                    onClose={() => setSecondSelectOpen(false)}
                    onOpen={() => setSecondSelectOpen(true)}
                    value={selectivePairId ?? "not chosen"}
                    onChange={handlePairsChange}
                >
                    <MenuItem value="not chosen">Не выбрано</MenuItem>
                    {
                        getSelectivePairs().map(({globalId, name}) => (
                            <MenuItem key={globalId} value={globalId}>{name}</MenuItem>
                        ))
                    }
                </CustomSelect>
            </Box>
        </React.Fragment>
    );

}

const mapStateToProps = ({ subscriptionsPage: { selectives, selectiveId, selectivePairId } }) => ({
    selectives,
    selectiveId,
    selectivePairId
});

const mapDispatchToProps = (dispatch) => ({
    "selectiveChanged": (payload) => dispatch(selectiveChanged(payload)),
    "selectivePairChanged": (payload) => dispatch(selectivePairChanged(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectableSubjects);