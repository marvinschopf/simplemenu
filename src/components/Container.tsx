import { Component, h } from "preact"

export default class Container extends Component {
	render() {
		return (
			<div style="width: 75%; margin: 0 auto;">{this.props.children}</div>
		)
	}
}
