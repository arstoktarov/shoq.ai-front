import React from 'react';
import AssignmentItem from "components/pages/topic-page/assignment-section/assignment-item";

const TaskItemController = (props) => {
    const { task } = props;
    const { onAnswerClick, withAnswerButton } = props;

    const handleAnswerClick = () => {
        onAnswerClick({ ...task, message: task.question });
    }

    return (
        <AssignmentItem
            onAnswerClick={handleAnswerClick}
            username={"Teacher"}
            question={task.question}
            questionMedia={task.image}
            withAnswerButton={withAnswerButton}
        />
    );

};

export default TaskItemController;