import {Box} from "@material-ui/core";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import apiService from "services/api-service";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {loadTopic} from "actions/topic-actions";

const useStyles = makeStyles({
    videoSection: {
        padding: "10px 0",
        margin: "0 0 30px 0"
    },
    videoFile: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        alignItems: "center",
        height: '372px',
        backgroundColor: "#F7F9FA",
        position: "relative"
    },
    controlsWrapper: {

    },
    addIcon: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    progressBar: {
        backgroundColor: "black",
        opacity: 0.8,
        left: 0,
        height: "100%",
        position: "absolute"
    },
    textTransformNone: {
        textTransform: "none",
    }
});

const VideoSection = (props) => {
    const classes = useStyles();
    const videoPlayer = useRef(null);
    const { topicId } = useParams();

    const { url, loadTopic } = props;

    const [duration, setDuration] = useState(null);
    const [completed, setCompleted] = useState(false);

    const onDurationLoaded = (duration) => {
        console.log("Video duration:", duration);
        setDuration(duration);
    };

    const onProgress = async ({ played }) => {
        if (played > 0.8 && !completed) {
            setCompleted(true);
            const data = await apiService.completeVideo(topicId);
            loadTopic(topicId);
            console.log(data);
        }
    }

    return (
        <Box>
            <Box className={classes.videoFile}>
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    onProgress={onProgress}
                    onDuration={onDurationLoaded}
                    ref={videoPlayer}
                    config={{
                        file: {
                            forceHLS: true,
                        },
                    }}
                    url={url} />
            </Box>
        </Box>
    );

}

const mapDispatchToProps = (dispatch) => ({
    loadTopic: (topicId) => dispatch(loadTopic(topicId)),
});

export default connect(null, mapDispatchToProps)(VideoSection);