import React, {useState} from 'react';
import CrudModal from "../../../../crud-modal/crud-modal";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    addAnswerButton: {
        borderRadius: "20px",
        backgroundColor: "#F7F9FA",
        width: "100%",
        height: "45px",
        fontSize: "0.8rem",
        color: "#CCD4E1",
        textTransform: "none"
    },
    addAnswerText: {
        fontSize: "0.8rem",
        color: "#CCD4E1",
        textTransform: "none"
    },
});

export default function CreateAnswer(props) {
    const classes = useStyles();

    const { onSubmit , question } = props;

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
        onSubmit({questionId: question.id, title});
        handleModalClose();
    }

    return (
        <React.Fragment>
            <Button className={classes.addAnswerButton} onClick={handleModalOpen}>
                <AddIcon fontSize="small" color="action"/>
                <Typography color="textSecondary" className={classes.addAnswerText}>
                    Добавить ответ
                </Typography>
            </Button>

            <CrudModal
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                onSubmit={onSubmitClicked}
            >
                <Box px={3} pt={2}>
                    <Typography color="textPrimary">Введите текст</Typography>
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