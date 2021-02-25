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
