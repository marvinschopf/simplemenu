import { Router, route } from "preact-router"
import { h, render } from "preact"
import firebase from "firebase/app"
import "firebase/auth"
import Plausible from "plausible-tracker"

import Home from "./routes/Home"
import { FirebaseAuthProvider } from "@react-firebase/auth"

import firebaseConfig from "./config/firebase"

import Login from "./routes/Login"
import { Alignment, Navbar, Button } from "@blueprintjs/core"

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
				<Login path="/login" />
				<Home path="/" />
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
