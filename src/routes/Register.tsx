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

import { Component, h, Fragment } from "preact"

import { FormGroup, InputGroup, Button, Alert } from "@blueprintjs/core"

import firebase from "firebase/app"
import "firebase/auth"

import { FirebaseAuthConsumer } from "@react-firebase/auth"
import { route } from "preact-router"

type RegisterFormProps = {
	plausible?: any
}

type RegisterFormState = {
	emailInput: string
	passwordInput: string
	passwordVerifyInput: string
	buttonLoading: boolean
	isAlertOpen: boolean
	errorMessage: string
}

class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
	constructor(props: RegisterFormProps) {
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
					large={true}
					fill={true}
					intent="primary"
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
											if (this.props.plausible) {
												this.props.plausible.trackEvent(
													"Signup"
												)
											}
											route("/dashboard")
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

type RegisterProps = {
	plausible?: any
}

export default class Register extends Component<RegisterProps> {
	constructor(props: RegisterProps) {
		super(props)
	}

	render() {
		return (
			<FirebaseAuthConsumer>
				{({ isSignedIn, user, providerId }) => {
					if (!isSignedIn) {
						if (this.props.plausible) {
							return (
								<RegisterForm
									plausible={this.props.plausible}
								/>
							)
						}
						return <RegisterForm />
					} else {
						route("/dashboard")
					}
				}}
			</FirebaseAuthConsumer>
		)
	}
}
