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

import { Component, Fragment, h } from "preact"

import { FirebaseAuthConsumer } from "@react-firebase/auth"
import { route } from "preact-router"

type DashboardViewProps = {
	user: any
}

type DashboardViewState = {}

class DashboardView extends Component<DashboardViewProps, DashboardViewState> {
	constructor(props: DashboardViewProps) {
		super(props)
	}

	render() {
		return (
			<Fragment>
				{this.props.user.fullName && (
					<h1>Willkommen, {this.props.user.fullName}!</h1>
				)}
				{!this.props.user.fullName && <h1>Herzlich Willkommen!</h1>}
			</Fragment>
		)
	}
}

export default class Dashboard extends Component {
	render() {
		return (
			<FirebaseAuthConsumer>
				{({ isSignedIn, user, providerId }) => {
					if (isSignedIn) {
						return <DashboardView user={user} />
					} else {
						route("/login")
					}
				}}
			</FirebaseAuthConsumer>
		)
	}
}
