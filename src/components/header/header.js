import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Menu, MenuItem, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {ShoqaiBrandIcon} from "components/icons";
import ShoqaiIcon from 'svg/full-white.svg';
import apiService from "services/api-service";

const useStyles = makeStyles({
    headerBox: {
        borderBottom: "1px solid #CCD4E1",
        top: 0,
        position: " sticky",
        gridArea: "header",
        width: "100%",
        zIndex: "5",
        opacity: 1,
        backgroundColor: "white",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px",
        flex: "1",
    },
    headerSection: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    headerLogo: { display: "flex", alignItems: "center" },
    headerFont: {
        fontFamily: "Raleway, sans-serif",
        fontWeight: "700",
        fontSize: "18px",
    },
    avatar: {
        margin: '0 15px',
        width: '35px',
        height: '35px',
    },
    username: {
        fontSize: '0.8rem',
    },
})

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);

    const { logout } = props;

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onLogoutClick = () => {
        localStorage.removeItem('isModerator');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        logout();
        handleClose();
    }

    useEffect(async () => {
        const { data: user } = await apiService.me();
        setUser(user);
    }, []);

    const onBrandClick = () => {
        history.push('/');
    }

    return (
        <Box className={classes.headerBox}>
            <Box className={`${classes.header} ${classes.headerFont}`}>
                <Box flexGrow="2" />
                <Box ml={2} flexGrow="2" className={classes.headerSection} onClick={onBrandClick}>
                    <img style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "10px",
                    }} src={ShoqaiIcon} alt="React Logo" />
                    <Typography className={`${classes.headerFont} ${classes.headerLogo}`}>
                        Shoqai
                    </Typography>
                </Box>
                <Box flexGrow="11" flexShrink="1" />
                {
                    user ?
                        <React.Fragment>
                            <Box flexGrow="1" flexShrink="0" className={classes.headerSection} onClick={handleClick}>
                                <Box display="flex" flexDirection="row" alignItems="center" ml="auto">
                                    <Typography className={classes.username}>
                                        {user?.username ?? ""}
                                    </Typography>
                                    <Avatar className={classes.avatar}
                                            alt="Shoq.ai User"
                                            src={user?.avatar ?? "U"}
                                    />
                                </Box>
                            </Box>
                            <Box flexGrow="2" />
                            <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
                            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Box flexGrow="1" flexShrink="0" />
                            <Box flexGrow="2" />
                        </React.Fragment>
                }
            </Box>
        </Box>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (payload) => dispatch({
            type: "LOGIN_LOGOUT",
            payload,
        })
    };
}

export default connect(null, mapDispatchToProps)(Header);