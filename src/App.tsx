import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
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
	if (process.env.ENABLE_ANALYTICS) {
		plausible = Plausible({
			domain: process.env.PLAUSIBLE_DOMAIN,
		})

		plausible.enableAutoPageviews()
	}
}

export default function Controller() {
	return (
		<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
			{/*@ts-ignore*/}
			<Navbar bg="light">
				<LinkContainer to="/">
					{/*@ts-ignore*/}
					<Navbar.Brand>SimpleMenu</Navbar.Brand>
				</LinkContainer>
				{/*@ts-ignore*/}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				{/*@ts-ignore*/}
				<Navbar.Collapse id="basic-navbar-nav">
					{/*@ts-ignore*/}
					<Nav className="mr-auto"></Nav>
					{/*@ts-ignore*/}
					<Nav>
						<LinkContainer to="/login">
							{/*@ts-ignore*/}
							<Button>Login</Button>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			{/*@ts-ignore*/}
			<Container>
				<Router>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
				<p>
					<small>
						Version:{" "}
						<a
							href={`https://github.com/marvinschopf/simplemenu/commit/${process.env.CURRENT_COMMIT_HASH}`}
						>
							{process.env.CURRENT_COMMIT_HASH_SHORT}
						</a>
					</small>
				</p>
			</Container>
		</FirebaseAuthProvider>
	)
}
