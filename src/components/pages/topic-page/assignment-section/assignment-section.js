import {Box} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TopicSectionLayout from "components/layouts/topic-section-layout";
import {connect} from "react-redux";
import ChatInput from "components/pages/topic-page/assignment-section/chat-input";
import TaskItemController from "./task-item-controller";
import ChatItem from "components/pages/topic-page/assignment-section/chat/chat-item";
import {replyTask} from "actions/task-actions";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
    assignmentSection: {
        padding: "0 10px",
        marginTop: "50px",
        height: "700px",
        maxWidth: "600px",
    },
    dialog: {
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
    },
});

const AssignmentSection = (props) => {
    const classes = useStyles();
    const { topicId } = useParams();

    const { items = [1], tasks = [1], studentMessages = [1], moderatorMessages = [], replyTask, answeredTaskIds = [] } = props;
    const [replyTo, setReplyTo] = useState(null);

    const handleChatSendClick = ({replyTo, message, image}) => {
        console.log(replyTo);
        replyTask({
            topicId: topicId,
            replyTo: replyTo.id,
            message: message,
            image: image,
        });
        setReplyTo(null);
    }

    const handleAnswerClick = (task) => {
        setReplyTo(task);
    }

    return (
        <TopicSectionLayout title="Тапсырма" subtitle="0/3">
            <Box className={classes.dialog}>
                {
                    tasks.map((task, idx) => (
                        <TaskItemController
                            withAnswerButton={!answeredTaskIds.includes(task.id)}
                            key={task.id}
                            onAnswerClick={handleAnswerClick}
                            task={task}
                        />
                    ))
                }
                {
                    studentMessages.map((message, idx) => (
                        <ChatItem
                            username={JSON.parse(localStorage.getItem("user")).firstName}
                            right={true}
                            key={message.id ?? idx}
                            text={message.message}
                            media={message.answerImage}
                            task={message}
                            replyText={message.replyTo.message}
                            withAnswerButton={false}
                        />
                    ))
                }
                {
                    moderatorMessages.map((message, idx) => (
                        <ChatItem
                            username={"Teacher"}
                            right={false}
                            key={idx}
                            text={message.addMessage}
                            media={message.addImage}
                            answer={message.message}
                            mark={message.mark}
                            answerMedia={message.answerImage}
                            task={message}
                            replyText={message.replyTo.message}
                            withAnswerButton={false}
                        />
                    ))
                }
            </Box>
            {
                replyTo ?
                    <ChatInput replyTo={replyTo} onSend={handleChatSendClick}/>
                    : ""
            }
        </TopicSectionLayout>
    );

}

const mapStateToProps = ({ task }) => {
    return {
        tasks: task.tasks,
        studentMessages: task.messageStudent,
        answeredTaskIds: task.answeredTaskIds,
        moderatorMessages: task.messageModerator,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replyTask: (payload) => dispatch(replyTask(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentSection);