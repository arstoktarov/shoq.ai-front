import React, {useCallback, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button, ButtonBase, CircularProgress,
    Fade,
    InputBase,
} from "@material-ui/core";
import Typography from "components/mui-customized/Typography";
import apiService from "services/api-service";
import Backdrop from "@material-ui/core/Backdrop";
import CrudModal from "components/crud-modal/crud-modal";
import {makeStyles} from "@material-ui/core/styles";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
    },
    majorItem: {
        width: "100%",
        boxShadow: "0 0 3px #5B7083",
        borderRadius: "10px",
        boxSizing: "border-box",
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
}))

const TrialStatisticsSection = () => {
    const classes = useStyles();
    const [major, setMajor] = useState();
    const [university, setUniversity] = useState();
    const [majorsModalOpen, setMajorsModalOpen] = useState(false);
    const [univerModalOpen, setUniverModalOpen] = useState(false);
    const [majorData, setMajorData] = useState({});
    const [univerData, setUniverData] = useState({});
    const [majorInputValue, setMajorInputValue] = useState('');
    const [univerInputValue, setUniverInputValue] = useState('');

    useEffect(async () => {
        loadMajors(1);
        loadUnivers(1);
    }, []);

    const handleMajorInputChange = async (e) => {
        setMajorInputValue(e.target.value);
        loadMajors(1, e.target.value, true);
    }
    const debouncedMajorChangeHandler = useCallback(debounce(handleMajorInputChange, 300), []);

    const handleUniverInputChange = (e) => {
        setUniverInputValue(e.target.value);
        loadUnivers(1, e.target.value, true);
    }
    const debouncedUniverChangeHandler = useCallback(debounce(handleUniverInputChange, 300), []);

    const loadMajors = async (page, search, reload) => {
        if (reload) setMajorData({});
        const { data } = await apiService.majorList(page, search ?? majorInputValue);
        setMajorData(({ majors = [] }) => ({
            ...data,
            majors: [
                ...majors,
                ...data.majors,
            ]
        }));
    }

    const loadUnivers = async (page, search, reload) => {
        if (reload) setUniverData({});
        const { data } = await apiService.univerList(page, [], search ?? univerInputValue);
        setUniverData(({ universities = [] }) => ({
            ...data,
            universities: [
                ...universities,
                ...data.universities,
            ],
        }));
    }

    const openMajorsModal = async () => {
        loadMajors(1);
    }

    const closeMajorsModal = async () => {
        loadUnivers(1);
    }

    const handleMajorButtonClick = () => {
        setMajorsModalOpen(true);
    }

    const handleUniverButtonClick = () => {
        setUniverModalOpen(true);
    }

    const handleMajorItemClick = (item) => () => {
        setUniversity(item);
        setMajorsModalOpen(false);
    }

    const handleUniverItemClick = (item) => () => {
        setMajor(item);
        setUniverModalOpen(false);
    }


    const { majors = [], totalPages: majorTotalPages = 1, currentPage: majorCurrentPage = 0 } = majorData;
    const { universities = [], totalPages: univerTotalPages = 1, currentPage: univerCurrentPage = 0 } = univerData;

    return (
        <Box display="flex" flexDirection="column">
            <Box px={2} py={3} display="flex" flexDirection="row" alignItems="center">
                <Typography>Профильные предметы:</Typography>
                <Box ml="auto" display="flex" flexDirection="row">
                    <Box>
                        <Button onClick={handleMajorButtonClick} style={{backgroundColor: "white"}} variant="contained" endIcon={<ArrowDownwardRoundedIcon />}>
                            <Typography fontSize="14px">CSSE</Typography>
                        </Button>
                    </Box>
                    <Box ml={3}>
                        <Button onClick={handleUniverButtonClick} style={{backgroundColor: "white"}} variant="contained" endIcon={<ArrowDownwardRoundedIcon />}>
                            <Typography fontSize="14px">CSSE</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <CrudModal
                onSubmit={() => {}}
                onClose={() => {setMajorsModalOpen(false);}}
                headerLabel={"Выберите учебное заведение"}
                className={classes.modal}
                open={majorsModalOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={majorsModalOpen}>
                    <Box height="100vh" style={{outline: 0}} position="relative"
                         bgcolor="white" width="700px" borderRadius="30px">
                        <Box px={2} borderTop="1px solid #CCD4E1" borderBottom="1px solid #CCD4E1"
                             display="flex" flexDirection="row" alignItems="center">
                            <SearchRoundedIcon color="primary"/>
                            <Box pt={1} pb={1} width="100%" ml={2}>
                                <InputBase
                                    onChange={debouncedMajorChangeHandler}
                                    fullWidth
                                    placeholder="Введите название"
                                />
                            </Box>
                        </Box>
                        <Box p={4}>
                            <InfiniteScroll
                                scrollableTarget="scrollableDiv"
                                style={{padding: "10px"}}
                                next={() => loadMajors(majorCurrentPage + 1)}
                                hasMore={majorCurrentPage < majorTotalPages}
                                loader={
                                    <Box width="100%" display="flex" flexDirection="column" alignItems="center"><CircularProgress /></Box>
                                }
                                scrollThreshold={0.8}
                                dataLength={majors.length}
                            >
                                        {
                                            majors.map((item) => (
                                                <ButtonBase
                                                    onClick={handleMajorItemClick(item)}
                                                    key={item.id}
                                                    className={classes.majorItem}
                                                >
                                                    <Box>
                                                        <Typography>{item.name}</Typography>
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" alignItems="center">
                                                        <Box>
                                                            <Typography customVariant="littleTextRoboto">Код: {item.code}</Typography>
                                                        </Box>
                                                        <Box mx={1}>
                                                            <Typography customVariant="littleTextRoboto" align="center">&bull;</Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography customVariant="littleTextRoboto">{item.grantCnt} грантов</Typography>
                                                        </Box>
                                                        <Box mx={1}>
                                                            <Typography customVariant="littleTextRoboto" align="center">&bull;</Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography customVariant="littleTextRoboto">{item.minStatGrade} мин. балл</Typography>
                                                        </Box>
                                                    </Box>
                                                </ButtonBase>
                                            ))
                                        }
                            </InfiniteScroll>
                        </Box>
                    </Box>
                </Fade>
            </CrudModal>
            <CrudModal
                onSubmit={() => {}}
                onClose={() => {setUniverModalOpen(false);}}
                headerLabel={"Выберите специальность"}
                className={classes.modal}
                open={univerModalOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={univerModalOpen}>
                    <Box height="100vh" style={{outline: 0}} position="relative" bgcolor="white" width="700px"
                         borderRadius="30px">
                        <Box px={2} borderTop="1px solid #CCD4E1" borderBottom="1px solid #CCD4E1" display="flex" flexDirection="row" alignItems="center">
                            <SearchRoundedIcon color="primary"/>
                            <Box pt={1} pb={1} width="100%" ml={2}>
                                <InputBase
                                    onChange={debouncedUniverChangeHandler}
                                    fullWidth
                                    placeholder="Введите название"
                                />
                            </Box>
                        </Box>
                        <Box p={4}>
                            <InfiniteScroll
                                scrollableTarget="scrollableDiv"
                                style={{padding: "10px"}}
                                next={() => loadUnivers(univerCurrentPage + 1)}
                                hasMore={univerCurrentPage < univerTotalPages}
                                loader={
                                    <Box width="100%" display="flex" flexDirection="column" alignItems="center"><CircularProgress /></Box>
                                }
                                scrollThreshold={0.8}
                                dataLength={universities.length}
                            >
                                {
                                    universities.map((item) => (
                                        <ButtonBase
                                            onClick={handleUniverItemClick(item)}
                                            key={item.id}
                                            className={classes.majorItem}
                                        >
                                            <Box display="flex" flexDirection="row" alignItems="center">
                                                <Avatar src={item.logo}/>
                                                <Box ml={2}>
                                                    <Typography>{item.name}</Typography>
                                                </Box>
                                            </Box>
                                        </ButtonBase>
                                    ))
                                }
                            </InfiniteScroll>
                        </Box>
                    </Box>
                </Fade>
            </CrudModal>
        </Box>
    );

}

export default TrialStatisticsSection;