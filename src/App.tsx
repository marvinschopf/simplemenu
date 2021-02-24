import Router from 'preact-router'
import { h, render } from 'preact'
import firebase from 'firebase/app'
import 'firebase/auth'
import Plausible from 'plausible-tracker'
/** @jsx h */

import Home from './routes/Home'
import { FirebaseAuthProvider } from '@react-firebase/auth'

import firebaseConfig from './config/firebase'

let plausible: any | false = false;

if(process.env.ENABLE_ANALYTICS) {
    plausible = Plausible({
        domain: process.env.PLAUSIBLE_DOMAIN,
    });
    
    plausible.enableAutoPageviews();
}

export default function Controller() {
	return (
		<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
			<Router>
				<Home path="/" />
			</Router>
			<p>
				<small>
					Version:{' '}
					<a
						href={`https://github.com/marvinschopf/simplemenu/commit/${process.env.CURRENT_COMMIT_HASH}`}
					>
						{process.env.CURRENT_COMMIT_HASH_SHORT}
					</a>
				</small>
			</p>
		</FirebaseAuthProvider>
	)
}
