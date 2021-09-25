import React from 'react';
import SubjectItem from "../subject-item";
import {makeStyles} from "@material-ui/core/styles";
import AppLoadingBar from "components/app-loading-bar";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridRowGap: "1em",
        gridColumnGap: "1em",
        justifyContent: "start",
        alignContent: "start",
    }
})

const SubjectList = (props) => {
    const classes = useStyles();

    const { items = [1, 2, 3, 4], loading, onSubjectClick } = props;

    if (loading) return <AppLoadingBar />

    return (
        <div className={classes.root}>
            {
                items.map((item, idx) => {
                    const { name, currentProgress, totalTopics, language, averageMark,isBought, infoPayment } = item;
                    return (<SubjectItem
                        key={idx}
                        title={name}
                        title2={`${currentProgress}/${totalTopics}`}
                        subtitle={"Средняя оценка"}
                        subtitle2={`${currentProgress}%`}
                        progressValue={currentProgress}
                    />)
                })
            }
        </div>
    );
}

export default SubjectList;