import { Router, route } from "preact-router"
import { h, render } from "preact"
import firebase from "firebase/app"
import "firebase/auth"
import Plausible from "plausible-tracker"

import Home from "./routes/Home"
import { FirebaseAuthProvider } from "@react-firebase/auth"

import firebaseConfig from "./config/firebase"

import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Login from "./routes/Login"

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
			{/*@ts-ignore*/}
			<Container>
				<Router>
					{/*@ts-ignore*/}
					<Navbar bg="light">
						{/*@ts-ignore*/}
						<Navbar.Brand
							onClick={() => {
								route("/")
							}}
						>
							SimpleMenu
						</Navbar.Brand>
						{/*@ts-ignore*/}
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						{/*@ts-ignore*/}
						<Navbar.Collapse id="basic-navbar-nav">
							{/*@ts-ignore*/}
							<Nav className="mr-auto"></Nav>
							{/*@ts-ignore*/}
							<Nav>
								{/*@ts-ignore*/}
								<Button
									onClick={() => {
										route("/login")
									}}
								>
									Login
								</Button>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
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
			</Container>
		</FirebaseAuthProvider>
	)
}
