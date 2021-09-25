import React, {useState} from 'react';
import CrudModal from "../../../crud-modal/crud-modal";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    addQuestionButton: {
        borderRadius: "20px",
        backgroundColor: "#F7F9FA",
        width: "100%",
        height: "45px",
        fontSize: "0.8rem",
        color: "#CCD4E1",
        textTransform: "none"
    },
    addQuestionText: {
        fontSize: "0.8rem",
        color: "#CCD4E1",
        textTransform: "none"
    },
});

export default function CreateQuestion(props) {
    const classes = useStyles();

    const { onSubmit } = props;

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }

    const onSubmitClicked = () => {
        onSubmit({title});
    }

    return (
        <React.Fragment>
            <Button className={classes.addQuestionButton} onClick={handleModalOpen}>
                <AddIcon fontSize="small" color="action"/>
                <Typography color="textSecondary" className={classes.addQuestionText}>
                    Добавить вопрос
                </Typography>
            </Button>

            <CrudModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                onSubmit={onSubmitClicked}
            >
                <Box px={3} pt={2}>
                    <Typography color="textPrimary">Введите название</Typography>
                    <Box mt={1}>
                        <TextField
                            onChange={handleInputChange}
                            autoFocus
                            fullWidth
                            rowsMax="3"
                            variant="outlined"
                            placeholder={"Название"} />
                    </Box>
                </Box>
            </CrudModal>
        </React.Fragment>
    );


}