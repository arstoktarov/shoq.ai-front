import React from 'react';
import PropTypes from 'prop-types';
import useStyles from "./styles";
import AnswerItem from "components/pages/topic-page/test-section/answer-item/answer-item";


const AnswerItemContainer = (props) => {
    const {idx, answer = {}, onClick, answered, selected} = props;
    const { answer: title = 'Loading...' } = answer;
    const { isCorrect } = answer;

    const handleClick = () => {
        onClick(answer.id);
    }

    let giveClass = "root";
    if (answered && isCorrect) giveClass = "correct";
    if (answered && selected && !isCorrect) giveClass = "incorrect";

    return (
        <AnswerItem disabled={answered} variant={giveClass} idx={idx} title={title} onClick={handleClick} />
    );

}

AnswerItemContainer.propTypes = {
    idx: PropTypes.number,
    title: PropTypes.any,
    selected: PropTypes.bool,
}

export default AnswerItemContainer;