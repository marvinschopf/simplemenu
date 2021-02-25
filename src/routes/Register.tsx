import { Component, h, Fragment } from "preact"

import { FormGroup, InputGroup, Button, Alert } from "@blueprintjs/core"

import firebase from "firebase/app"
import "firebase/auth"

type RegisterProps = {
	path: string
}

type RegisterState = {
	emailInput: string
	passwordInput: string
	passwordVerifyInput: string
	buttonLoading: boolean
	isAlertOpen: boolean
	errorMessage: string
}

export default class Register extends Component<RegisterProps, RegisterState> {
	constructor(props: RegisterProps) {
		super(props)
		this.state = {
			emailInput: "",
			passwordInput: "",
			passwordVerifyInput: "",
			buttonLoading: false,
			isAlertOpen: false,
			errorMessage: "",
		}
	}

	render() {
		return (
			<Fragment>
				<h1>Registrieren</h1>
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
						}}
					/>
				</FormGroup>
				<FormGroup
					helperText="Passwort bestätigen"
					label="Passwort bestätigen"
					labelInfo="(Pflichtfeld)"
				>
					<InputGroup
						placeholder="Passwort bestätigen"
						value={this.state.passwordVerifyInput}
						type="password"
						onChange={(event) => {
							this.setState({
								passwordVerifyInput: event.target.value,
							})
						}}
					/>
				</FormGroup>
				<Button
					text="Registrieren"
					loading={this.state.buttonLoading}
					onClick={() => {
						this.setState({
							buttonLoading: true,
						})
						if (
							this.state.emailInput.length != 0 &&
							this.state.passwordInput.length != 0 &&
							this.state.passwordVerifyInput.length != 0
						) {
							if (
								this.state.passwordInput ===
								this.state.passwordVerifyInput
							) {
								firebase
									.auth()
									.createUserWithEmailAndPassword(
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
										let errorMessage: string =
											"Unbekannter Fehler."
										switch (error.code) {
											case "auth/email-already-in-use":
												errorMessage =
													"Es existiert bereits ein Benutzerkonto mit dieser E-Mail-Adresse."
												break
											case "auth/invalid-email":
												errorMessage =
													"Die angegebene E-Mail-Adresse ist nicht gültig."
												break
											case "auth/operation-not-allowed":
												errorMessage =
													"Ein interner Fehler ist aufgetreten."
												break
											case "auth/operation-not-allowed":
												errorMessage =
													"Das angegebene Passwort ist zu einfach."
												break
											default:
												errorMessage =
													"Unbekannter Fehler."
												break
										}
										this.setState({
											isAlertOpen: true,
											errorMessage: errorMessage,
											buttonLoading: false,
										})
									})
							} else {
								this.setState({
									isAlertOpen: true,
									errorMessage:
										"Die angegebenen Passwörter stimmen nicht überein.",
									buttonLoading: false,
								})
							}
						} else {
							this.setState({
								isAlertOpen: true,
								errorMessage: "Bitte fülle alle Felder aus.",
								buttonLoading: false,
							})
						}
					}}
				/>
				<Alert
					confirmButtonText="Okay"
					isOpen={this.state.isAlertOpen}
					onClose={() => {
						this.setState({
							isAlertOpen: false,
						})
					}}
				>
					<b>Fehler: </b>
					{this.state.errorMessage}
				</Alert>
			</Fragment>
		)
	}
}
