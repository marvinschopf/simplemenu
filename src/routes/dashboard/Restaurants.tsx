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

import { FirebaseAuthConsumer } from "@react-firebase/auth"
import { FirestoreCollection } from "@react-firebase/firestore"
import { Component, Fragment, h } from "preact"
import { route } from "preact-router"

type RestaurantViewProps = {
	user: any
}

class RestaurantsView extends Component<RestaurantViewProps> {
	render() {
		return (
			<Fragment>
				<h1>Meine Restaurants</h1>
				<FirestoreCollection
					path="/restaurants/"
					where={{
						field: "owner",
						operator: "==",
						value: this.props.user.uid,
					}}
				>
					{(d) => {
						return d.isLoading ? "Loading" : <pre>{d.value}</pre>
					}}
				</FirestoreCollection>
			</Fragment>
		)
	}
}

export default class Restaurants extends Component {
	render() {
		return (
			<FirebaseAuthConsumer>
				{({ isSignedIn, user, providerId }) => {
					if (isSignedIn) {
						return <RestaurantsView user={user} />
					} else {
						route("/login")
					}
				}}
			</FirebaseAuthConsumer>
		)
	}
}
