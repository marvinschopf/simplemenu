import Router from 'preact-router';
import { h, render } from 'preact';
/** @jsx h */

import Home from "./routes/Home";

export default function Controller() {

    return (
        <Router>
            <Home path="/" />
        </Router>
    );
}