import React, {createRef, useEffect, useRef, useState} from "react";
import MainLayout from "components/layouts/main-layout";
import {
    Avatar, Box, ButtonBase, CardMedia, CircularProgress, Fade, IconButton, InputAdornment, Link as MuiLink, TextField,
} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "components/mui-customized/Button";
import Typography from "components/mui-customized/Typography";
import useStyles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import FilledIconButton from "components/mui-customized/FilledIconButton";
import {connect} from "react-redux";
import {editProfile, loadProfile} from "actions/profile-actions";
import {useHistory} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CrudModal from "components/crud-modal/crud-modal";
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import TrialStatisticsSection from "components/pages/profile-page/trial-statistics-section";


const Link = withStyles((theme) => ({
    root: {
        userSelect: "none",
        textDecoration: "underline",
        textDecorationColor: theme.palette.primary.main,
        '&:hover': {
            textDecoration: "none",
        }
    }
}))(MuiLink);

const ProfilePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const inputAvatarRef = useRef(null);

    const { loadProfile, editProfile, user = {}, loading, error } = props;


    const [modalOpen, setModalOpen] = useState(false);
    const [editProfileValues, setEditProfileValues] = useState({
        avatar: null,
        avatarUrl: user?.avatar,
        firstName: user?.firstName ?? "",
        secondName: user?.secondName ?? "",
        username: user?.username ?? "",
        parentNumber: user?.parentNumber ?? "",
        password: "",
    });


    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            const {avatar, firstName, secondName, username, parentNumber} = user;
            setEditProfileValues((values) => ({...values, avatarUrl: avatar, firstName, secondName, username, parentNumber}));
        }
    }, [user]);

    const handleEditProfileSubmit = (e) => {
        editProfile(editProfileValues);
    }

    const {
        avatar = null,
        firstName = "",
        secondName = "",
        username = "",
        friendsCount = "",
        imageSet: {
            wallpaperImage,
        } = {},
    } = user;

    const handleEditValueChange = (inputName) => (e) => {
        const value = e.target.value;
        setEditProfileValues( (values) => ({
            ...values,
            [inputName]: value,
        }));
    }

    const handleNumberChange = (e) => {
        let number = e.target.value;
        if (number.length < 2 && number !== "+") {
            number = "+7" + number;
        }
        if (!number.startsWith("+7")) {
            number = "+7" + number.substring(2, number.length);
        }
        setEditProfileValues( (values) => ({
            ...values,
            parentNumber: number,
        }));
    }

    const handleEditAvatarImageChange = (e) => {
        if (e.target.files.length > 0) {
            const reader  = new FileReader();
            const file = e.target.files[0];

            reader.onloadend = function () {
                setEditProfileValues((values) => ({
                    ...values,
                    avatarUrl: reader.result
                }));
            }

            if (file) {
                reader.readAsDataURL(file);
            }

            if (file) {
                setEditProfileValues({
                    ...editProfileValues,
                    avatar: e.target.files[0],
                });
                console.log(editProfileValues.avatar);
            }

        }
    }

    const handleFriendCountClick = () => {
        history.push(location.pathname + '/friends');
    }

    const handleAddFriendClick = () => {
        history.push(location.pathname + '/searchFriend');
    }

    const handleChangeProfileClick = () => {
        setModalOpen(true);
    }

    return (
        <MainLayout>
            <Box className={classes.root}>
                <Box className={classes.card}>
                    <Box mb={2}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={wallpaperImage ?? "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V4fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"}
                            title="Contemplative Reptile"
                        />
                        <Box ml={3} display="flex" flexDirection="row">
                            <Box display="flex" flexDirection="column" mt="-60px">
                                <Box width="120px" height="120px">
                                    <Avatar
                                        src={avatar}
                                        className={classes.avatar}
                                    />
                                </Box>
                                <Box ml={1}>
                                    <Box mt={2}><Typography fontWeight={800} fontSize="18px">{`${firstName} ${secondName}`}</Typography></Box>
                                    <Box><Typography customVariant="subtitleRoboto">@{username}</Typography></Box>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" ml="auto" mt={2} mr={3}>
                                <Button onClick={handleChangeProfileClick} className={classes.button} color="primary" variant="outlined">Изменить профиль</Button>
                                <Box ml="auto" mt={5} display="flex" flexDirection="row" alignItems="center">
                                    <FilledIconButton onClick={handleAddFriendClick} color="primary" variant="outlined"><PersonAddIcon /></FilledIconButton>
                                    <Box mx={2}>
                                        <Link onClick={handleFriendCountClick}><Typography customVariant="subtitleRoboto">{`${friendsCount} друзей`}</Typography></Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.card} position="relative">
                    <Box className={classes.blurred}>
                        <Box zIndex="9998" position="absolute" width="100%" height="100%" top="0" left="0" right="0"bottom="0"
                            display="flex" flexDirection="row" justifyContent="center">
                        </Box>
                        {/* <Box height="500px">
                            <TrialStatisticsSection />
                        </Box> */}
                    </Box>
                    <Box className={classes.inDevelopmentBackground} height="450px" zIndex="9999" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                        <Box ml={7}>
                        <Typography>На стадии разработки</Typography>
                        </Box>
                    </Box>
                </Box>

                <CrudModal
                    onSubmit={handleEditProfileSubmit}
                    onClose={() => {setModalOpen(false)}}
                    headerLabel={"Изменить профиль"}
                    className={classes.modal}
                    open={modalOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <Box style={{outline: 0}} position="relative" bgcolor="white" width="700px" borderRadius="30px">
                            <Box position="relative">
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={wallpaperImage ?? "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V4fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"}
                                    title="Contemplative Reptile"
                                />
                                <Box ml={2} width="120px" height="120px" mt="-60px">
                                    <ButtonBase onClick={() => {inputAvatarRef.current.click()}} disableTouchRipple style={{userSelect: "none", width: "100%", height: "100%"}}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            ref={inputAvatarRef}
                                            onChange={handleEditAvatarImageChange}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <Avatar
                                            className={classes.avatar}
                                            src={editProfileValues.avatarUrl ?? avatar ?? "https://baltic-grlk5lagedl.stackpathdns.com/production/baltic/images/1549357428364401-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=top&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb"}
                                        >
                                        </Avatar>
                                    </ButtonBase>
                                </Box>
                                <form>
                                    <Box px={6} mt={5} mb={2}>
                                        <Box mt={2}>
                                            <TextField size="small" InputProps={{
                                                classes: {input: classes.input}
                                            }} value={editProfileValues.firstName} onChange={handleEditValueChange("firstName")} fullWidth label="Имя" variant="outlined" />
                                        </Box>
                                        <Box mt={2}>
                                            <TextField size="small" InputProps={{
                                                classes: {input: classes.input}
                                            }} value={editProfileValues.secondName} onChange={handleEditValueChange("secondName")} fullWidth label="Фамилия" variant="outlined" />
                                        </Box>
                                        <Box mt={2}>
                                            <TextField size="small" InputProps={{
                                                classes: {input: classes.input}
                                            }} value={editProfileValues.username} onChange={handleEditValueChange("username")} fullWidth label="Имя пользователя" variant="outlined" />
                                        </Box>
                                        <Box mt={2}>
                                            <TextField size="small" InputProps={{
                                                classes: {input: classes.input}
                                            }} value={editProfileValues.password} onChange={handleEditValueChange("password")} fullWidth label="Пароль" variant="outlined" />
                                        </Box>
                                        <Box mt={2}>
                                            <TextField size="small" InputProps={{
                                                classes: {input: classes.input},
                                            }} value={editProfileValues.parentNumber} onChange={handleNumberChange} fullWidth label="Номер родителя" variant="outlined" />
                                        </Box>
                                    </Box>
                                </form>
                            </Box>
                            <Box px={10} pt={3} display="flex" flexDirection="column" alignItems="center">

                            </Box>
                        </Box>
                    </Fade>
                </CrudModal>
            </Box>
        </MainLayout>

    );

}

const mapStateToProps = ({ profile }) => {
    return {
        user: profile.user,
        loading: profile.loading,
        error: profile.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProfile: () => dispatch(loadProfile()),
        editProfile: (payload) => dispatch(editProfile(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);