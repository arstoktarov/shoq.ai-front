import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, TextField, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../../../mui-customized/Button";
import {makeStyles} from "@material-ui/core/styles";
import MuiModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: '30px',
        display: "flex",
        flexDirection: "column",
        minWidth: '378px',
        minHeight: '192px',
        outline: 0,
    },
    header: {
        padding: "10px 10px 5px 10px",
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid #CCD4E1",
    },
    headerText: {
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    saveButton: {
        alignSelf: "center",
        marginLeft: "auto",
        padding: '0 35px 0 35px',
        height: '35px',
        boxShadow: 'none',
    },
    form: {
        padding: "15px 25px 0 25px",
    },
    input: {
        marginTop: "15px",
        width: '100%',
        marginBottom: "20px",
    }
}));

function SectionModal(props) {
    const {
        open,
        handleClose,
        headerButtonLabel,
        headerLabel,
        textFieldLabel,
        textFieldPlaceholder,
        onSubmit,
        value,
        resetValue = false
    } = props;

    const [title, setTitle] = useState(value ?? '');
    const [selectionStart, setSelectionStart] = React.useState();
    const inputRef = React.useRef();

    const updateSelectionStart = () => setSelectionStart(inputRef.current.selectionEnd);

    useEffect(() => {
        if (resetValue) setTitle(value);
    }, [open])

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            submit();
        }

    }

    const submit = () => {
        handleClose();
        onSubmit(title);
        setTitle('');
    }


    const classes = useStyles();

    return (
        <MuiModal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box className={classes.paper}>
                    <Box className={classes.header}>
                        <IconButton onClick={handleClose} color="primary">
                            <CloseIcon />
                        </IconButton>
                        <Typography className={classes.headerText}>{headerLabel ?? 'Добавить главу'}</Typography>
                        <Button variant="contained"
                                className={classes.saveButton}
                                onClick={submit}
                                color="primary">
                            {headerButtonLabel ?? 'Сохранить'}
                        </Button>
                    </Box>
                    <Box className={classes.form}>
                        <Typography>{textFieldLabel ?? 'Введите название'}</Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            rowsMax="3"
                            variant="outlined"
                            className={classes.input}
                            onSelect={updateSelectionStart}
                            ref={inputRef}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                            value={title}
                            placeholder={textFieldPlaceholder ?? "Название"} />
                    </Box>
                </Box>
            </Fade>
        </MuiModal>
    );
}


export default SectionModal