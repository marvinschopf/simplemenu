import Router from 'preact-router';
import { h, render } from 'preact';
import firebase from "firebase/app";
import "firebase/auth";
/** @jsx h */

import Home from "./routes/Home";
import { FirebaseAuthProvider } from '@react-firebase/auth';

import firebaseConfig from "./config/firebase";

export default function Controller() {

    return (
        <FirebaseAuthProvider
            firebase={firebase}
            {...firebaseConfig}
        >
            <Router>
                <Home path="/" />
            </Router>
        </FirebaseAuthProvider>
    );
}