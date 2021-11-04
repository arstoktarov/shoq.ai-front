import React, {useEffect} from "react";
import {Backdrop, Box, CircularProgress} from "@material-ui/core";
import SectionList from "components/pages/subject-page/section-list/section-list";
import MainLayout from "components/layouts/main-layout";
import Breadcrumb from "components/mui-customized/breadcrumb";
import Button from "components/mui-customized/Button";
import {PlayArrowRounded} from "@material-ui/icons";
import {useHistory, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {loadSubject} from "actions/subject-actions";

const SubjectPage = (props) => {
    const { subjectId } = useParams();
    const history = useHistory();

    const { loadSubject, subject, loading } = props;

    useEffect(() => {
        loadSubject(subjectId);
    }, []);

    const getActiveSection = (sections) => {
        if (sections) {
            const activeSection = sections.find((section) => {
                return section.topics.find((topic) => {
                    return topic.active;
                });
            });
            console.log(activeSection);
            return activeSection;
        }
        else {
            return null;
        }
    }

    const getActiveTopic = (sections) => {
        return getActiveSection(sections).topics.find((topic) => {
            return topic.active;
        })
    }

    const openActiveTopic = () => {
        if (subject) {
            const { sections } = subject;
            const activeTopic = getActiveTopic(sections);
            if (activeTopic) {
                console.log(activeTopic);
                if (activeTopic.available && activeTopic.active && !activeTopic.completed) {
                    history.push(`/subjects/${subjectId}/topics/${activeTopic.id}`);
                }
            }
        }
    }

    const handleContinueCourseButtonClick = () => {
        openActiveTopic();
    }

    const { name, sections } = subject;

    return (
        <MainLayout>
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Box p={2} maxWidth="700px">
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box width="70%">
                        <Breadcrumb onClick={() => {history.push('/subjects')}} primaryText={name}/>
                    </Box>
                    <Box ml="auto" py={1}>
                        <Button onClick={handleContinueCourseButtonClick} variant="contained" color="primary" startIcon={<PlayArrowRounded />}>Продолжить курс</Button>
                    </Box>
                </Box>
                <SectionList activeSection={getActiveSection(sections)} items={sections}/>
            </Box>
        </MainLayout>
    );
}

const mapStateToProps = ({ subject }) => {
    return {
        loading: subject.loading,
        error: subject.error,
        subject: subject.subject,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSubject: (subjectId) => dispatch(loadSubject(subjectId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);