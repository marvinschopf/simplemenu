import { Component, h, Fragment } from "preact"

import { FormGroup, InputGroup, Button, Alert } from "@blueprintjs/core"

import firebase from "firebase/app"
import "firebase/auth"

type LoginState = {
	emailInput: string
	passwordInput: string
	buttonEnabled: boolean
	buttonLoading: boolean
	isOpenError: boolean
	errorMessage: string
}

type LoginProps = {
	path: string
}

class Login extends Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props)
		this.state = {
			emailInput: "",
			passwordInput: "",
			buttonEnabled: false,
			buttonLoading: false,
			isOpenError: false,
			errorMessage: "",
		}
	}

	render() {
		return (
			<Fragment>
				<h1>Anmelden</h1>
				<FormGroup
					helperText="E-Mail-Adresse"
					label="E-Mail-Adresse"
					labelInfo="(Pflichtfeld)"
				>
					<InputGroup
						placeholder="E-Mail-Adresse"
						value={this.state.emailInput}
						type="email"
						onChange={(event) => {
							this.setState({
								emailInput: event.target.value,
							})
							if (
								this.state.passwordInput.length >= 1 &&
								this.state.emailInput.length >= 1
							) {
								this.setState({
									buttonEnabled: true,
								})
							}
							if (
								this.state.passwordInput.length === 0 ||
								this.state.emailInput.length === 0
							) {
								this.setState({
									buttonEnabled: false,
								})
							}
						}}
					/>
				</FormGroup>
				<FormGroup
					helperText="Passwort"
					label="Passwort"
					labelInfo="(Pflichtfeld)"
				>
					<InputGroup
						placeholder="Passwort"
						value={this.state.passwordInput}
						type="password"
						onChange={(event) => {
							this.setState({
								passwordInput: event.target.value,
							})
							if (
								this.state.passwordInput.length >= 1 &&
								this.state.emailInput.length >= 1
							) {
								this.setState({
									buttonEnabled: true,
								})
							}
							if (
								this.state.passwordInput.length === 0 ||
								this.state.emailInput.length === 0
							) {
								this.setState({
									buttonEnabled: false,
								})
							}
						}}
					/>
				</FormGroup>
				<Button
					disabled={!this.state.buttonEnabled}
					text="Anmelden"
					loading={this.state.buttonLoading}
					onClick={() => {
						this.setState({
							buttonLoading: true,
						})
						firebase
							.auth()
							.signInWithEmailAndPassword(
								this.state.emailInput,
								this.state.passwordInput
							)
							.then(
								(
									userCredential: firebase.auth.UserCredential
								) => {
									this.setState({
										buttonLoading: false,
									})
									console.log(userCredential)
								}
							)
							.catch((error) => {
								let errorMessage: string = "Unbekannter Fehler."
								switch (error.code) {
									case "auth/user-not-found":
										errorMessage =
											"Ein Konto mit den angegebenen Zugangsdaten konnte leider nicht gefunden werden."
										break
									case "auth/wrong-password":
										errorMessage =
											"Das angegebene Passwort ist nicht korrekt."
										break
									case "auth/user-disabled":
										errorMessage =
											"Dieses Benutzerkonto wurde deaktiviert."
										break
									case "auth/invalid-email":
										errorMessage =
											"Die angegebene E-Mail-Adresse ist nicht gültig."
										break
									default:
										errorMessage = "Unbekannter Fehler."
										break
								}
								this.setState({
									buttonLoading: false,
									isOpenError: true,
									errorMessage: errorMessage,
								})
							})
					}}
				/>
				<Alert
					confirmButtonText="Okay"
					isOpen={this.state.isOpenError}
					onClose={() => {
						this.setState({
							isOpenError: false,
						})
					}}
				>
					<b>Fehler:</b> {this.state.errorMessage}
				</Alert>
			</Fragment>
		)
	}
}

export default Login
