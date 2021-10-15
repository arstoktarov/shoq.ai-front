import React, {useEffect, useState} from 'react';
import MainLayout from "components/layouts/main-layout";
import {Avatar, Box, CircularProgress, Fade, Modal} from "@material-ui/core";
import SubjectList from "components/subject/subject-list";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "components/mui-customized/Typography";
import RoundedButton from "components/mui-customized/RoundedButton";
import {connect} from "react-redux";
import {loadSubjects} from "actions/subject-list-actions";
import SubjectItem from "components/subject/subject-item";
import {useHistory} from "react-router-dom";
import SelectivesSection from "components/pages/trial-page/selectives-section";

const useStyles = makeStyles(() => ({
    root: {
        padding: "1rem 0",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridRowGap: "1em",
        gridColumnGap: "1em",
        justifyContent: "start",
        alignContent: "start",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
    },
    avatar: {
        width: "80px",
        height: "80px",
    },
}));

const SubjectsPage = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { list = [], loadSubjects, loading, selectives } = props;

    const [modalOpen, setModalOpen] = useState(true);

    const onSubjectClick = (id) => () => {
        history.push(`/subjects/${id}`);
    }

    useEffect(() => {
        loadSubjects();
    }, [selectives]);

    return (
        <MainLayout>
            <Backdrop style={{zIndex: 99999}} open={loading}>
                <CircularProgress />
            </Backdrop>
            <Box px={3} py={2} display="flex" flexDirection="row" flexWrap="wrap">
                <Box>
                    <SelectivesSection />
                </Box>
                <div className={classes.root}>
                    {
                        list.map((item, idx) => {
                            const { name, currentProgress, totalTopics, language, averageMark, isBought, infoPayment } = item;
                            return (<SubjectItem
                                key={idx}
                                title={name}
                                isBought={isBought}
                                infoPayment={infoPayment}
                                supTitle={language}
                                title2={`${currentProgress}/${totalTopics}`}
                                subtitle={"Средняя оценка"}
                                subtitle2={`${averageMark}%`}
                                progressValue={currentProgress}
                                onClick={onSubjectClick(item.id)}
                            />)
                        })
                    }
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={false}
                    onClose={() => {setModalOpen(false)}}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <Box style={{outline: 0}} position="relative" bgcolor="white" width="417px" height="263px" borderRadius="30px">
                            <Box px={10} pt={3} display="flex" flexDirection="column" alignItems="center">
                                <CircularProgress
                                    thickness={3}
                                    style={{
                                        width: "87px",
                                        height:"87px",
                                        zIndex: 10,
                                        position: "absolute"
                                    }}
                                    variant="determinate"
                                    value={-90}
                                />
                                <Avatar
                                    src="https://baltic-grlk5lagedl.stackpathdns.com/production/baltic/images/1549357428364401-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=top&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"
                                    className={classes.avatar}
                                />
                                <Box mt={2}><Typography>Вас зовут на баттл</Typography></Box>
                                <Box mt={1}><Typography fontWeight="500" fontSize="12px" customVariant="subtitleRoboto">Гурбангулы Бердымухаммедов</Typography></Box>
                                <Box width="100%" mt={5} display="flex" flexDirection="row" justifyContent="space-between">
                                    <RoundedButton variant="contained" color="secondary">Отказать</RoundedButton>
                                    <RoundedButton variant="contained" color="primary">Принять</RoundedButton>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        </MainLayout>
    );

}

const mapStateToProps = ({ subjectList, selectivesReducer }) => {
    return {
        list: subjectList.list,
        loading: subjectList.loading,
        selectives: selectivesReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSubjects: () => dispatch(loadSubjects()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage);