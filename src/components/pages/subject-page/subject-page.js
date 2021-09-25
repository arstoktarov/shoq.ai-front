import React, {useEffect} from "react";
import {Box} from "@material-ui/core";
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

    const { loadSubject, subject } = props;

    useEffect(() => {
        loadSubject(subjectId);
    }, []);


    const { name, sections } = subject;

    return (
        <MainLayout>
            <Box p={2} maxWidth="700px">
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box width="70%">
                        <Breadcrumb onClick={() => {history.push('/subjects')}} primaryText={name} secondaryText={"Разделы: 3/4 до 03.12.2021"}/>
                    </Box>
                    <Box ml="auto" py={1}>
                        <Button variant="contained" color="primary" startIcon={<PlayArrowRounded />}>Продолжить курс</Button>
                    </Box>
                </Box>
                <SectionList items={sections}/>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);