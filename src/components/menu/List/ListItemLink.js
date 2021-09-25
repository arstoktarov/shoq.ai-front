import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from "./ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ListItemText} from "./index";

export default function ListItemLink(props) {
    const { icon, primary, to, iconProps = {}, textProps = {} } = props;

    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <ListItem {...props} button component={CustomLink}>
            <ListItemIcon {...iconProps} style={{
                minWidth: "40px",
                color: "inherit",
            }}>
                {icon}
            </ListItemIcon>
            <ListItemText style={{
                fontFamily: "Raleway, Roboto",
                fontWeight: 700,
                fontSize: "16px",
            }} {...textProps} primary={primary}/>
        </ListItem>
    );
}