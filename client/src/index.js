import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/**
 * Material-UI imports
 */
import {
    createMuiTheme,
    ThemeProvider,
    responsiveFontSizes,
} from "@material-ui/core/styles";

/**
 * Material-UI Theming
 * Create custom palette & add typography fonts
 */
let theme = createMuiTheme({
    palette: {
        primary: {
            main: "#080c26",
        },
        secondary: {
            main: "#f9fcfd",
        },
        text: {
            main: '#c9e7f3',
        }
    },
    typography: {
        fontFamily: `"Bungee Shade"', '"Roboto Condensed", "Fascinate Inline"`
    },
});

/**
 * Making the fonts responsive
 */
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
