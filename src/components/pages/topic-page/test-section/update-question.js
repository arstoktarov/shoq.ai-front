import React, {useState} from 'react';
import CrudModal from "../../../crud-modal/crud-modal";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "../../../mui-customized/IconButton";

const useStyles = makeStyles({
});

export default function UpdateQuestion(props) {
    const classes = useStyles();

    const { onSubmit, value } = props;

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState(value);

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
        handleModalClose();
    }

    return (
        <React.Fragment>
            <IconButton onClick={handleModalOpen} >
                <EditIcon fontSize="small" />
            </IconButton>

            <CrudModal
                width="40%"
                open={modalOpen}
                handleOpen={handleModalOpen}
                handleClose={handleModalClose}
                onSubmit={onSubmitClicked}
            >
                <Box px={3} pt={2} pb={2}>
                    <Typography color="textPrimary">Введите название</Typography>
                    <Box mt={1}>
                        <TextField
                            value={value}
                            onChange={handleInputChange}
                            autoFocus
                            multiline
                            fullWidth
                            rows={2}
                            rowsMax={5}
                            variant="outlined"
                            placeholder={"Название"} />
                    </Box>
                </Box>
            </CrudModal>
        </React.Fragment>
    );


}