import React, {useRef, useState} from 'react';
import {Box, Checkbox, FormControlLabel, IconButton, InputBase, Typography} from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import {makeStyles} from "@material-ui/core/styles";
import ReplyView from "./chat/reply-view";

const useStyles = makeStyles((theme) => {
    return {
        chatInput: {
            display: "flex",
            flexDirection: "column",
            bottom: 10,
            position: "sticky",
            backgroundColor: "white",
            border: "2px solid #CCD4E1",
            zIndex: 5,
            boxShadow: "0px 2px 7px -4px #6E6E6E",
            borderRadius: "20px",
            //maxWidth: "750px",
            minHeight: "60px",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
        },
        checkBoxText: {
            fontSize: "0.8rem",
            //fontWeight: "lighter",
        }
    };
});

const ChatInput = (props) => {
    const classes = useStyles();

    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const { replyTo, onSend } = props;

    const imageInput = useRef(null);

    const onSendClick = () => {
        onSend({ replyTo, message, image });
        setMessage("");
        setImage(null);
        setImageUrl("");
    }

    const onImageChange = (e) => {
        if (e.target.files.length > 0) {
            const reader  = new FileReader();
            const file = e.target.files[0];

            reader.onloadend = function () {
                setImageUrl(reader.result);
            }

            if (file) {
                reader.readAsDataURL(file);
            }

            setImage(e.target.files[0]);
        }
    }

    const onAddImageClick = () => {
        if (imageInput) {
            imageInput.current?.click();
        }
    }

    return (
        <Box className={classes.chatInput}>
            <Box>
                {
                    replyTo ? <ReplyView text={replyTo.message}/> : ""
                }
            </Box>
            <Box>
                <InputBase
                    fullWidth
                    className={classes.margin}
                    multiline
                    rows={3}
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}}
                    rowsMax={10}
                    placeholder="Жазыңыз..."
                    inputProps={{ 'aria-label': 'naked' }}
                />
            </Box>
            <Box>
                {
                    imageUrl ? <ImageView imageUrl={imageUrl}/> : ""
                }
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Box>
                    <IconButton onClick={onAddImageClick} color="primary">
                        <input
                            id="answer-image-input"
                            type="file"
                            onChange={onImageChange}
                            ref={imageInput}
                            hidden
                        />
                        <InsertPhotoIcon />
                    </IconButton>
                </Box>
                <Box ml="auto">
                    <IconButton onClick={onSendClick} color="primary">
                        <SendRoundedIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );

}

const ImageView = ({ imageUrl }) => {
    return (
        <Box height="100px">
            <img
                height="100%"
                src={imageUrl}
                alt="nothing"
            />
        </Box>
    );
}

export default ChatInput;