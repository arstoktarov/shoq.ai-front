import React, {useEffect, useState} from 'react';
import {Box, Fade, Typography} from "@material-ui/core";
import AnswerItem from "../answer-item";
import {makeStyles} from "@material-ui/core/styles";
import AnswerItemContainer from "components/pages/topic-page/test-section/answer-item/answer-item-container";

const useStyles = makeStyles({
});

const QuestionItem = (props) => {
    const classes = useStyles();
    const { question, onAnswerClick } = props;

    const q = question;

    const { question: title = "Loading...", answers = [1,2,3,4] } = question;

    const [fade, setFade] = useState(true);

    const handleAnswerClick = (answerId) => {
        onAnswerClick(question.id, answerId);
    }

    return (
        <Box>
            <Box mb={5}>
                <Typography style={{textIndent: "50px", overflowWrap: "break-word"}} color="textSecondary">
                    <Box dangerouslySetInnerHTML={{__html: title}}/>
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
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
        </Box>
    );

};

export default QuestionItem;