import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Link from "@material-ui/core/Link"
import {
    BrowserRouter as Router,
    Switch,
    Route

} from "react-router-dom";
import ListView from "./listView"
import CardView from "./cardView"

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    card: {
        marginRight: 10
    }
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};



export default function BackToTop(props) {
    const classes = useStyles()
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color="secondary">
                <Toolbar>
                    <Typography variant="h6">
                        <Link className={classes.card} href="/list" color="inherit">
                            List
                    </Link>
                        <Link className={classes.card} href="/cardView" color="inherit">
                            Card
                    </Link>
                    </Typography>
                </Toolbar>

            </AppBar>
            <Toolbar id="back-to-top-anchor" />

            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Router>
                <Switch>
                    <Route path="/list">

                        <ListView />

                    </Route>
                    <Route path="/cardView">
                        <CardView />
                    </Route>
                    <Route path="/">
                        <ListView />
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>

    );
}
