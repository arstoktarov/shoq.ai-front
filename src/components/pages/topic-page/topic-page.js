import React, {useEffect} from 'react';
import Header from "../../header";
import {Backdrop, CircularProgress, Box, Divider, Fade} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumb from "../../mui-customized/breadcrumb";
import TestSection from "./test-section/test-section";
import VideoSection from "./video-section/video-section";
import AssignmentSection from "./assignment-section/assignment-section";
import {useHistory, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {loadTopic} from "actions/topic-actions";
import {loadSubject} from "actions/subject-actions";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
    },
    divider: {
        position: "absolute",
        left: 0,
        right: 0,
    },
    blurred: {
        //"filter": "blur(4px)",
        "-webkit-filter": "blur(4px)",
    },
}));


const TopicPage = (props) => {
    const classes = useStyles();
    const { topicId, subjectId } = useParams();
    const history = useHistory();

    const { loadSubject, loadTopic, topic, subject, loading, error } = props;

    useEffect(() => {
        loadSubject(subjectId);
        loadTopic(topicId);
    }, []);

    return (
        <Box className={classes.root}>
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Header/>
            <Box mt={3} mx="auto" zIndex={1} width="60vw" className={classes.body}>
                <Box display="flex" justifyContent="flex-start">
                    <Breadcrumb
                        onClick={() => {history.push(`/subjects/${subjectId}`)}}
                        primaryText={subject.name}
                        secondaryText={topic.name}
                    />
                </Box>
                <Box mt={2}>
                    <VideoSection url={topic?.video?.link ?? ""}/>
                    <Divider className={classes.divider} variant="fullWidth"/>
                    <Box position="relative" className={!topic?.history?.video ? classes.blurred : ""}>
                        {
                            !topic?.history?.video ?
                            <Box zIndex="9999" position="absolute" width="100%" height="100%" top="0" left="0" right="0"
                                 bottom="0" />
                            : ""
                        }
                        <Box>
                            <TestSection topic={topic}/>
                        </Box>
                    </Box>
                    <Divider className={classes.divider} variant="fullWidth"/>
                    <Box position="relative" className={!topic?.history?.test ? classes.blurred : ""}>
                        {
                            !topic?.history?.test ?
                            <Box zIndex="9999" position="absolute" width="100%" height="100%" top="0" left="0" right="0"
                                 bottom="0" />
                            : ""
                        }
                        <Box>
                            <AssignmentSection />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

const mapStateToProps = ({ topic, subject }) => {
    return {
        loading: topic.loading,
        topic: topic.topic,
        error: topic.error,
        subject: subject.subject,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSubject: subjectId => dispatch(loadSubject(subjectId)),
        loadTopic: topicId => dispatch(loadTopic(topicId)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);