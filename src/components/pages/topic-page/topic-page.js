import React, {useEffect} from 'react';
import Header from "../../header";
import {Box, Divider, Fade} from "@material-ui/core";
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
            <Header/>
            <Box mt={3} mx="auto" zIndex={1} width="60vw" className={classes.body}>
                <Box display="flex" justifyContent="flex-start">
                    <Breadcrumb
                        onClick={() => {history.push(`/subjects/${subjectId}`)}}
                        height="50px"
                        primaryText={subject.name}
                        secondaryText={topic.name}
                    />
                </Box>
                <Box mt={2}>
                    <VideoSection url={topic?.video?.link ?? ""}/>
                    <Divider className={classes.divider} variant="fullWidth"/>
                    <Box hidden={!topic?.history?.video}>
                        <Fade timeout={1000} in={topic?.history?.video}>
                            <Box>
                                <TestSection />
                            </Box>
                        </Fade>
                    </Box>
                    <Divider className={classes.divider} variant="fullWidth"/>
                    <Box hidden={!topic?.history?.test}>
                        <Fade in={topic?.history?.test}>
                            <Box>
                                <AssignmentSection />
                            </Box>
                        </Fade>
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