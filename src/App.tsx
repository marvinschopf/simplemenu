import { Router, route } from "preact-router"
import { h, render } from "preact"
import firebaseConfig from "./config/firebase"
import firebase from "firebase/app"
import "firebase/auth"
import Plausible from "plausible-tracker"

//@ts-ignore
firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = "de"

import Home from "./routes/Home"
import { FirebaseAuthProvider } from "@react-firebase/auth"

import Login from "./routes/Login"
import { Alignment, Navbar, Button } from "@blueprintjs/core"
import Route404 from "./routes/404"

let plausible: any | false = false

if (typeof document !== "undefined" && typeof window !== "undefined") {
	if (process.env.APP_ENABLE_ANALYTICS) {
		plausible = Plausible({
			domain: process.env.APP_PLAUSIBLE_DOMAIN,
		})

		plausible.enableAutoPageviews()
	}
}

export default function Controller() {
	return (
		<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Navbar.Heading
						onClick={() => {
							route("/")
						}}
					>
						SimpleMenu
					</Navbar.Heading>
					<Navbar.Divider />
				</Navbar.Group>
				<Navbar.Group align={Alignment.RIGHT}>
					<Button
						className="bp3-minimal"
						text="Login"
						onClick={() => {
							route("/login")
						}}
					/>
				</Navbar.Group>
			</Navbar>
			<Router>
				<Home path="/" />
				<Login path="/login" />
				<Route404 default />
			</Router>
			<p>
				<small>
					Version:{" "}
					<a
						href={`https://github.com/marvinschopf/simplemenu/commit/${process.env.APP_CURRENT_COMMIT_HASH}`}
					>
						{process.env.APP_CURRENT_COMMIT_HASH_SHORT}
					</a>
				</small>
			</p>
		</FirebaseAuthProvider>
	)
}
