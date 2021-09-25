import React, {useState} from 'react';
import {Box, CardMedia, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "../../../../mui-customized/Button";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import {ChatBox, ChatUsername} from "components/chat";
import Typography from "components/mui-customized/Typography";

const useStyles = makeStyles({
    media: {
        margin: '10px 10px',
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    answerButton: {
        padding: "8px",
    },
    insertPhotoButton: {
        backgroundColor: "#1DA1F2",
        color: "white",
        padding: "5px",
        marginRight: "10px",
        "&:hover": {
            backgroundColor: "#1DA1F2",
        },
    },
});

const AssignmentItem = (props) => {
    const classes = useStyles(props);
    const { questionMedia, question, username, withAnswerButton, right, onAnswerClick } = props;

    return (
        <ChatBox right={right}>
            <Box>
                <Box mb={1}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <ChatUsername>{username ?? 'Unknown'}</ChatUsername>
                    </Box>
                    <Typography variant="body1">Вопрос:</Typography>
                    <Typography variant="subtitle2">
                        {question ?? "Question not assigned"}
                    </Typography>
                    {
                        questionMedia ?
                        <CardMedia
                            className={classes.media}
                            image={questionMedia ?? "Answer not assigned"}
                            title="Media not found"
                        />
                        : ""
                    }
                </Box>
                {props.children}
            </Box>
            {
                withAnswerButton ?
                <Box position="absolute" bottom={-10} right={20}>
                    {/*<IconButton size="small" className={classes.insertPhotoButton}>*/}
                    {/*    <InsertPhotoIcon fontSize="small"/>*/}
                    {/*</IconButton>*/}
                    <Button
                        disableFocusRipple
                        disableElevation
                        className={classes.answerButton}
                        variant="contained"
                        onClick={onAnswerClick}
                        color="primary">Ответить</Button>
                </Box>
                : ""
            }
            <Box>
                <Typography customVariant="subtitleRaleway">Жауапты сурет түрінде беріңіз</Typography>
            </Box>
        </ChatBox>
    );

};

export default AssignmentItem;