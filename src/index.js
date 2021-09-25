import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider} from 'react-redux';
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from 'notistack';

import store from "./store";
import App from "./components/app";

ReactDOM.render(
    <CookiesProvider>
        <ReduxProvider store={store}>
            <Router>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </Router>
        </ReduxProvider>
    </CookiesProvider>
    , document.getElementById("root"));