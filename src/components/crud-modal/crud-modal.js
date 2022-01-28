import React from 'react';
import {Box, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../mui-customized/Button";
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
        "&::-webkit-scrollbar": {
            display: "none",
        }
    },
    header: {
        padding: "10px 10px 5px 10px",
        display: "flex",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        opacity: 1,
        zIndex: 15,
        flexDirection: "row",
        borderBottom: "1px solid #CCD4E1",
    },
    headerText: {
        marginLeft: "10px",
        marginRight: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    submitButton: {
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "10px",
        padding: '0 35px 0 35px',
        height: '35px',
        boxShadow: 'none',
    },
    form: {
        padding: "15px 25px 30px 25px",
    },
    input: {
        marginTop: "15px",
        width: '100%',
        marginBottom: "20px",
    }
}));

function CrudModal(props) {
    const {
        open,
        onClose,
        headerButtonLabel,
        headerLabel,
        onSubmit,
        component = null,
    } = props;

    const submit = () => {
        onSubmit();
        onClose();
    }


    const classes = useStyles();

    return (
        <MuiModal
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box id="scrollableDiv" width={props.width} className={classes.paper} overflow="scroll" maxHeight="100vh">
                    <Box className={classes.header}>
                        <IconButton onClick={() => {onClose()}} color="primary">
                            <CloseIcon />
                        </IconButton>
                        <Typography color="textPrimary" className={classes.headerText}>{headerLabel ?? 'Добавить главу'}</Typography>
                        <Button variant="contained"
                                className={classes.submitButton}
                                onClick={submit}
                                color="primary">
                            {headerButtonLabel ?? 'Сохранить'}
                        </Button>
                    </Box>
                    <Box>
                        {component ?? props.children}
                    </Box>
                </Box>
            </Fade>
        </MuiModal>
    );
}


export default CrudModal