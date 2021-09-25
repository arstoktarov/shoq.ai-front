import React, {useState} from 'react';
import {Box, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CustomSlider from "../slider";
import CrudModal from "../../../../crud-modal/crud-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "../../../../mui-customized/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {withApiService} from "components/hoc";

const useStyles = makeStyles(() => ({
    form: {
        padding: "15px 25px 15px 25px",
    },
    input: {
        width: '100%',
        marginBottom: "10px",
    },
    anchor:{
        borderRadius: "10px",
        backgroundColor: "#F7F9FA",
        height: "45px",
        paddingLeft: "20px",
        marginBottom: "5px",
    },
    text: {
        fontSize: "0.8rem",
        color: "#5B7083",
        fontWeight: "lighter",
    },
}));

function AddAnswersModal(props) {
    const {
        open,
        onSubmit,
        handleClose,
        videoDuration,
        apiService,
        topic,
        onAddInternalLink,
        onDeleteInternalLink,
        onAddExternalLink,
        onDeleteExternalLink,
    } = props;

    const [internalLinkTitle, setInternalLinkTitle] = useState("");
    const [externalLinkTitle, setExternalLinkTitle] = useState("");
    const [externalLinkUrl, setExternalLinkUrl] = useState("");
    const [internalLinkValue, setInternalLinkValue] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [selectOpen, setSelectOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectLoading, setSelectLoading] = useState(false);

    React.useEffect(() => {
        let active = true;

        if (internalLinkTitle === "") return undefined;
        setSelectLoading(true);

        (async () => {
            const markups = await apiService.searchMarkup(topic.id, internalLinkTitle);

            if (active) {
                setOptions(markups ?? []);
                setSelectLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [internalLinkTitle]);
    React.useEffect(() => {
        if (!selectOpen) {
            setOptions([]);
        }
    }, [selectOpen]);


    const submit = () => {
    }

    const addInternalLinkClick = () => {
        onAddInternalLink({
            startTime: sliderValue,
            markupId: internalLinkValue.id
        });
    }
    const deleteInternalLinkClick = (id) => {
        onDeleteInternalLink({internalLinkId: id});
    }

    const addExternalLinkClick = () => {
        onAddExternalLink({
            startTime: sliderValue,
            name: externalLinkTitle,
            link: externalLinkUrl
        })
    }
    const deleteExternalLinkClick = (id) => {
        onDeleteExternalLink({externalLinkId: id});
    }

    const onSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    }

    const classes = useStyles();

    return (
        <CrudModal width="40%" handleClose={handleClose} {...props}>
            <Box>
                <Box className={classes.form}>
                    <Box mb={2} display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                            <Typography style={{marginRight: "20px"}}>Время</Typography>
                            <Typography>
                                {new Date((sliderValue ?? 0) * 1000).toISOString().substr(11, 8)}
                            </Typography>
                            <Button
                                style={{textTransform: "none", marginLeft: "auto"}}
                                color="secondary"
                                variant="contained"
                                startIcon={<DeleteIcon />}>
                                Удалить разметку
                            </Button>
                        </Box>
                    </Box>
                    <CustomSlider onChange={onSliderChange} min={0} max={videoDuration} value={sliderValue} valueLabelDisplay={"on"}/>
                    <Box mb={2}>
                        <Box mb={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Typography color="textPrimary">{'Введите название'}</Typography>
                            <Button
                                onClick={addInternalLinkClick}
                                style={{textTransform: "none", marginLeft: "auto"}}
                                color="primary" variant="contained"
                                startIcon={<AddIcon />}>
                                Добавить
                            </Button>
                        </Box>
                        <Autocomplete
                            fullWidth
                            onChange={(event, value) => {setInternalLinkValue(value)}}
                            id="asynchronous-demo"
                            open={selectOpen}
                            noOptionsText="Не найдено"
                            onOpen={() => {
                                setSelectOpen(true);
                            }}
                            onClose={() => {
                                setSelectOpen(false);
                            }}
                            getOptionSelected={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            options={options}
                            loading={selectLoading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    autoFocus
                                    fullWidth
                                    rowsMax={3}
                                    size="small"
                                    variant="outlined"
                                    placeholder="Название"
                                    className={classes.input}
                                    value={internalLinkTitle}
                                    onChange={(e) => setInternalLinkTitle(e.target.value)}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {selectLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        {
                            topic.video.internalLinks.map(({id, markup: {name}}, idx) => (
                                <Box key={idx} className={classes.anchor} display="flex" flexDirection="row" alignItems="center">
                                    <Typography className={classes.text}>{name}</Typography>
                                    <IconButton onClick={() => {deleteInternalLinkClick(id)}}
                                                variant="contained"
                                                color="secondary"
                                                style={{marginLeft: "auto"}}>
                                        <DeleteIcon color="secondary" fontSize="small"/>
                                    </IconButton>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box mb={2}>
                        <Box mb={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Typography color="textPrimary">{'Введите название'}</Typography>
                            <Button
                                onClick={addExternalLinkClick}
                                style={{textTransform: "none", marginLeft: "auto"}}
                                color="primary" variant="contained"
                                startIcon={<AddIcon />}>
                                Добавить
                            </Button>
                        </Box>
                        <TextField
                            value={externalLinkTitle}
                            onChange={(e) => setExternalLinkTitle(e.target.value)}
                            size="small"
                            autoFocus
                            fullWidth
                            rowsMax="3"
                            variant="outlined"
                            className={classes.input}
                            placeholder={"Название"} />
                        <TextField
                            value={externalLinkUrl}
                            onChange={(e) => setExternalLinkUrl(e.target.value)}
                            size="small"
                            autoFocus
                            fullWidth
                            rowsMax="3"
                            variant="outlined"
                            className={classes.input}
                            placeholder={"Ссылка"} />
                        {
                            topic.video.externalLinks.map(({id, name}, idx) => (
                                <Box key={idx} className={classes.anchor} display="flex" flexDirection="row" alignItems="center">
                                    <Typography className={classes.text}>{name}</Typography>
                                    <IconButton
                                        onClick={() => {deleteExternalLinkClick(id)}}
                                        variant="contained"
                                        color="secondary"
                                        style={{marginLeft: "auto"}}>
                                        <DeleteIcon color="secondary" fontSize="small"/>
                                    </IconButton>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </CrudModal>
    );
}


export default withApiService()(AddAnswersModal);