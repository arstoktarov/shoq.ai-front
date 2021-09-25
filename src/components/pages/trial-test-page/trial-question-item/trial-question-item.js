import React, {useState} from "react";
import {Box, Button, ButtonBase, Modal} from "@material-ui/core";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import Typography from "components/mui-customized/Typography";
import TrialAnswerItem from "components/pages/trial-test-page/trial-answer-item";
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PropTypes from "prop-types";
import useStyles from "./styles";

const TrialQuestionItem = (props) => {
    const classes = useStyles();
    const { trialFinished, question, onMarkClick, onTextClick, text, onAnswerClick } = props;

    const { id, isMarked, type, isAnswered, question: title, answers, textId, selectedAnswerIds, correctAnswerIds } = question;

    const [modalOpen, setModalOpen] = useState(false);

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    }
    catch (e) {console.error(e)}

    const handleMarkClick = (e) => {
        onMarkClick(id);
    }

    const handleTextClick = () => {
        setModalOpen(true);
    }

    const isAnswerCorrect = (id) => {
        return correctAnswerIds.some(a => a === id);
    }

    const isAnswerSelected = (id) => {
        return selectedAnswerIds.some(a => a === id)
    }

    const getAnswerVariant = (id) => {
        if (trialFinished) {
            if (isAnswerCorrect(id)) return "correct";
            if (isAnswerSelected(id)) return "incorrect";
        }
        else {
            if (isAnswerSelected(id)) return "selected";
        }
        return "root";
    }

    return (
        <Box>
            {
                <Box hidden={!textId} width="100%" height="50px">
                    <Button onClick={handleTextClick} className={classes.openTextButton} fullWidth variant="contained" disableFocusRipple disableTouchRipple startIcon={<DescriptionRoundedIcon />}>
                        {text?.title}
                    </Button>
                </Box>
            }
            <Box mb={2} display="flex" flexDirection="row">
                <Box display="flex" flexDirection="row" alignItems="flex-start">
                    <ButtonBase disableTouchRipple>
                        {
                            isMarked ?
                                <BookmarkOutlinedIcon onClick={handleMarkClick} color="secondary"/>
                                :
                                <BookmarkBorderRoundedIcon onClick={handleMarkClick} color="primary"/>
                        }
                    </ButtonBase>
                </Box>
                <Box ml={2} display="flex" flexDirection="row" alignItems="center">
                    <Typography component="div" customVariant="subtitleRoboto" fontWeight="500" style={{overflowWrap: "break-word", margin: 0}} color="textSecondary">
                        <span dangerouslySetInnerHTML={{__html: title}}>
                        </span>
                    </Typography>
                </Box>
            </Box>
            {
                answers.map((answer, idx) => (
                    <TrialAnswerItem
                        answered={isAnswerSelected(answer.id)}
                        answerImage={user?.avatar ?? ""}
                        onClick={onAnswerClick(question, answer)}
                        variant={getAnswerVariant(answer.id)}
                        idx={idx}
                        key={answer.id}
                        title={answer.answer} />
                ))
            }
            {
                text ?
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
                : ""
            }
        </Box>
    );

}

TrialQuestionItem.props = {
    onMarkClick: PropTypes.func,
    question: PropTypes.object,
    text: PropTypes.any,
}

export default TrialQuestionItem;