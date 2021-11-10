import React, {useEffect, useState} from 'react';
import {Box, Button, Fade, Modal, Typography} from "@material-ui/core";
import AnswerItem from "../answer-item";
import {makeStyles} from "@material-ui/core/styles";
import AnswerItemContainer from "components/pages/topic-page/test-section/answer-item/answer-item-container";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";

const useStyles = makeStyles((theme) => ({
    openTextButton: {
        backgroundColor: "white",
        color: theme.palette.text.secondary,
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "1rem",
        "&:hover": {
            backgroundColor: "white",
        }
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalBox: {
        padding: theme.spacing(6),
        minWidth: "40%",
        maxWidth: "60%",
        maxHeight: "70vh",
        backgroundColor: "white",
        borderRadius: "20px",
        overflow: "scroll",
        outline: 0,
    }
}));

const QuestionItem = (props) => {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);

    const { texts = [], question, onAnswerClick } = props;

    const { question: title = "Loading...", answers = [1,2,3,4], textId = null } = question;

    const handleAnswerClick = (answerId) => {
        onAnswerClick(question.id, answerId);
    }

    const handleTextClick = () => {
        setModalOpen(true);
    }

    const text = texts.find(text => text.id === textId);

    console.log(texts);
    console.log(text);

    return (
        <Box>
            {
                <Box hidden={!textId} width="100%" height="50px">
                    <Button onClick={handleTextClick} className={classes.openTextButton} fullWidth variant="contained" disableFocusRipple disableTouchRipple startIcon={<DescriptionRoundedIcon />}>
                        {text?.title}
                    </Button>
                </Box>
            }
            <Box mt={1}>
                <Typography style={{textIndent: "50px", overflowWrap: "break-word"}} color="textSecondary">
                    <Box dangerouslySetInnerHTML={{__html: title}}/>
                </Typography>
            </Box>
            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                {
                    answers.map((answer, idx) => {
                        return (<AnswerItemContainer
                            answered={question.answered}
                            selected={question.answerId === answer.id}
                            answer={answer ?? {}}
                            onClick={handleAnswerClick}
                            key={idx}
                            idx={idx}
                        />)
                    })
                }
            </Box>
            <Modal onClose={() => setModalOpen(false)} open={modalOpen} className={classes.modal}>
                <Box className={classes.modalBox}>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <Typography variant="h6">{text?.title ?? ""}</Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography component="div" variant="subtitle1"><Box
                            dangerouslySetInnerHTML={{__html: text?.content}}/></Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );

};

export default QuestionItem;