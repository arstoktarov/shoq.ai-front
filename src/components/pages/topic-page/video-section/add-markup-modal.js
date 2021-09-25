import React, {useState} from 'react';
import {Box, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CustomSlider from "./slider";
import CrudModal from "../../../crud-modal/crud-modal";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    form: {
        padding: "15px 25px 15px 25px",
    },
    input: {
        marginTop: "15px",
        width: '100%',
        marginBottom: "20px",
    },
    anchor: {
        borderRadius: "10px",
        backgroundColor: "#F7F9FA",
        height: "45px",
        paddingLeft: "20px",
        marginBottom: "5px",
    },
    timeText: {
        fontFamily: "Roboto",
        color: "#5B7083",
        fontWeight: "lighter"
    }
}));

const hmsToSecondsOnly = (str) => {
    let p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

function AddMarkupModal(props) {
    const minValue = 0;
    const maxValue = 200;
    const [title, setTitle] = useState("");
    const [sliderValues, setSliderValues] = useState([0, 0]);

    const {
        topic, onSubmit, videoDuration, onDeleteMarkup, handleClose, open
    } = props;

    const submit = () => {
        onSubmit({title, startTime: sliderValues[0], endTime: sliderValues[1]});
    }

    const onSliderChange = (event, newValue) => {
        setSliderValues(newValue);
    }

    const onDeleteClick = (id) => {
        onDeleteMarkup(id);
    }

    const onStartPickerChange = (e) => {
        let value = 0;
        try {
            value = hmsToSecondsOnly(e.target.value);
        }
        catch (e) {
            return;
        }
        if (value > sliderValues[1] || value > maxValue || value < minValue) return;
        setSliderValues([value, sliderValues[1]])
    }

    const onEndPickerChange = (e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value);
        if (value < sliderValues[0] || value > maxValue || value < minValue) return;
        setSliderValues([sliderValues[0], value])
    }

    const secondsToTimeString = (seconds) => {
        return new Date((seconds ?? 0) * 1000).toISOString().substr(14, 5);
    }

    const classes = useStyles();

    return (
        <CrudModal open={open} width="50%" handleClose={handleClose} {...props} onSubmit={submit}>
            <Box>
                <Box className={classes.form}>
                    <Typography color="textPrimary">{'Введите название'}</Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        rowsMax="3"
                        variant="outlined"
                        className={classes.input}
                        onChange={(e) => {setTitle(e.target.value)}}
                        value={title}
                        placeholder={"Название"} />
                    <CustomSlider onChange={onSliderChange} min={0} max={videoDuration ?? 0} value={sliderValues} valueLabelDisplay={"on"}/>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography>
                                Начало
                            </Typography>
                            <Typography className={classes.timeText}>
                                {secondsToTimeString(sliderValues[0])}
                            </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography>
                                Конец
                            </Typography>
                            <Typography className={classes.timeText}>
                                {secondsToTimeString(sliderValues[1])}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        {
                            topic
                                ?
                            topic.video.markups.map(({id, name, startTime, endTime}, idx) => (
                                <Box key={idx} className={classes.anchor} display="flex" flexDirection="row" alignItems="center">
                                    <Typography className={classes.text}>{name}</Typography>
                                    <Box display="flex" flexDirection="row" ml="auto" alignItems="center">
                                        <Typography className={classes.timeText}>
                                            {secondsToTimeString(startTime)}
                                            -
                                            {secondsToTimeString(endTime)}
                                        </Typography>
                                        <IconButton onClick={() => onDeleteClick(id)} variant="contained" color="secondary">
                                            <DeleteIcon color="secondary" fontSize="small"/>
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))
                                : ""
                        }
                    </Box>
                </Box>
            </Box>
        </CrudModal>
    );
}

export default AddMarkupModal;