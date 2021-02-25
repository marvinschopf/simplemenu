/**
 *
 * SimpleMenu
 * Copyright (C) 2021 Marvin Schopf
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license AGPL-3.0-or-later
 * @copyright 2021 Marvin Schopf
 *
 */

import { Router, route } from "preact-router"
import { Fragment, h, render } from "preact"
import firebaseConfig from "./config/firebase"
import firebase from "firebase/app"
import "firebase/auth"
import Plausible from "plausible-tracker"

//@ts-ignore
firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = "de"

import Home from "./routes/Home"
import {
	FirebaseAuthProvider,
	FirebaseAuthConsumer,
} from "@react-firebase/auth"

import Login from "./routes/Login"
import Register from "./routes/Register"
import { Alignment, Navbar, Button } from "@blueprintjs/core"
import Route404 from "./routes/404"

import Container from "./components/Container"
import Dashboard from "./routes/Dashboard"
import Logout from "./routes/Logout"

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
					<FirebaseAuthConsumer>
						{({ isSignedIn, user, providerId }) => {
							if (!isSignedIn) {
								return (
									<Fragment>
										<Button
											className="bp3-minimal"
											text="Login"
											onClick={() => {
												route("/login")
											}}
										/>
										<Button
											className="bp3-minimal"
											text="Registrieren"
											intent="primary"
											onClick={() => {
												route("/signup")
											}}
										/>
									</Fragment>
								)
							} else {
								return (
									<Fragment>
										<Button
											className="bp3-minimal"
											text="Logout"
											intent="danger"
											onClick={() => {
												route("/logout")
											}}
										/>
									</Fragment>
								)
							}
						}}
					</FirebaseAuthConsumer>
				</Navbar.Group>
			</Navbar>
			<Container>
				<Router>
					<Home path="/" />
					<Login path="/login" />
					<Register path="/signup" />
					<Dashboard path="/dashboard" />
					<Logout path="/logout" />
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
			</Container>
		</FirebaseAuthProvider>
	)
}
