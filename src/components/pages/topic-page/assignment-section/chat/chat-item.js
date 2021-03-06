import React, {useCallback, useState} from 'react';
import {Box, CardMedia, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "components/mui-customized/Button";
import {ChatBox, ChatUsername} from "components/chat";
import MarkRadio from "../mark-radio";
import ReplyView from "../chat/reply-view";
import ImageViewer from 'react-simple-image-viewer';

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

const ChatItem = (props) => {
    const classes = useStyles(props);
    const {
        onAnswerClick,
        item,
        username,
        replyText,
        text,
        media,
        withAnswerButton,
        right,
        mark,
        answer,
        answerMedia
    } = props;
    const [currentImage, setCurrentImage] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const onAnswerClicked = () => {
        onAnswerClick(item);
    }

    const openImageViewer = useCallback((media) => {
        setCurrentImage(media);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setCurrentImage(null);
    };

    return (
        <ChatBox right={right}>
            <Box mb={2}>
                <Box mb={1}>
                    <Box mb={1} display="flex" flexDirection="row" alignItems="center">
                        <ChatUsername>{username ?? 'Unknown'}</ChatUsername>
                    </Box>
                    {
                        replyText ? <ReplyView text={replyText} /> : ""
                    }
                    <Typography variant="subtitle2">
                        {text ?? "Text not assigned"}
                    </Typography>
                    {
                        media
                            ?
                            <CardMedia
                                onClick={() => openImageViewer(media)}
                                className={classes.media}
                                image={media ?? "Media not assigned"}
                                title="Media not found"
                            />
                            : ""
                    }
                    {
                        answer ?
                            <React.Fragment>
                                <Typography variant="body1">??????????:</Typography>
                                <Typography variant="subtitle2">{answer ?? "??????"}</Typography>
                            </React.Fragment>
                        : ""
                    }
                    {
                        answerMedia ?
                            <CardMedia
                                onClick={() => openImageViewer(media)}
                                className={classes.media}
                                image={answerMedia ?? "Answer not assigned"}
                                title="Media not found"
                            />
                        : ""
                    }
                </Box>
                {props.children}
            </Box>
            {
                withAnswerButton ? <AnswerButtonView onClick={onAnswerClicked} title="????????????????" /> : ""
            }
            {
                mark ?
                <Box position="absolute" bottom={-10} right={20}>
                    <MarkRadio label={`${mark}%`} selected />
                </Box>
                : ""
            }
            {isViewerOpen && (
                <ImageViewer
                    src={ [currentImage] }
                    currentIndex={ 0 }
                    disableScroll={ true }
                    closeOnClickOutside={ true }
                    onClose={ closeImageViewer }
                />
            )}
        </ChatBox>
    );

};

const AnswerButtonView = ({ onClick, title }) => {
    const classes = useStyles();
    return (
        <Box position="absolute" bottom={-10} right={20}>
            {/*<IconButton size="small" className={classes.insertPhotoButton}>*/}
            {/*    <InsertPhotoIcon fontSize="small"/>*/}
            {/*</IconButton>*/}
            <Button
                onClick={onClick}
                disableFocusRipple
                disableElevation
                className={classes.answerButton}
                variant="contained"
                color="primary">
                {title}
            </Button>
        </Box>
    );
}

export default ChatItem;