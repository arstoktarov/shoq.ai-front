import React, {useState} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SectionItem from "../section-item";
import SectionModal from "../section-item/section-modal";
import {Accordion, AccordionSummary} from "../../../mui-customized/Accordion";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
    },
    sectionItem: {
        marginBottom: '20px',
    },
    sectionList: {
        marginTop: '20px',
    },
    addSectionBox: {
        opacity: 0.5,
    },
    addSectionButton: {
        borderRadius: '10px',
        padding: 0,
    },
    addSectionButtonSummary: {
        borderRadius: '10px',
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        width: '100%',
        transition: "none",
    },
    topicItem: {}
}));

function SectionList(props) {
    const { items = [1] } = props;
    const classes = useStyles();

    const [expandedSection, setExpandedSection] = useState(`panel_${0}`);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpandedSection(newExpanded ? panel : false);
    };

    return (
        <Box className={classes.sectionList}>
            {
                items.map((item, index) => {
                    return (
                        <SectionItem
                            topics={item.topics}
                            title={item.name}
                            key={index}
                            index={index}
                            expanded={expandedSection}
                            handleChange={handleChange} />
                    );
                })
            }
        </Box>
    );

}

export default SectionList;