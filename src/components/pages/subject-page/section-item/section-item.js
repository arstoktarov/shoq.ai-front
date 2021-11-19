import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "components/mui-customized/Accordion";
import {Box} from "@material-ui/core";
import {List} from "components/mui-customized/Accordion/AccordionList";
import {makeStyles} from "@material-ui/core/styles";
import TopicItem from "../topic-item";
import Typography from "components/mui-customized/Typography";

const useStyles = makeStyles(() => ({
    sectionItem: {
        marginBottom: '20px',
    },
    sectionNumber: {
        marginRight: '20px',
        fontFamily: 'Roboto'
    },
    addTopicButton: {
        borderRadius: '0 0 10px 10px',
        opacity: '0.5',
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
}));

function SectionItem(props) {
    const { topics = [1], title = "loading...", expanded, handleChange, index } = props;
    const classes = useStyles();



    return (
        <Box className={classes.sectionItem}>
            <Accordion square expanded={expanded === `panel_${index}`} onChange={handleChange(`panel_${index}`)}>
                <AccordionSummary>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography className={classes.sectionNumber}>{index + 1}</Typography>
                        <Typography>{title}</Typography>
                    </Box>
                    <Box ml="auto">
                        <Typography customVariant="subtitleRoboto">1/{topics.length}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {
                            topics.map((item, idx) => (
                                <TopicItem
                                    key={item.id}
                                    id={item.id}
                                    available={item.available}
                                    completed={item.completed}
                                    active={item.active}
                                    title={item.name}
                                    idx={idx}
                                />
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default SectionItem;