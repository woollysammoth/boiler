import { h, Component } from 'preact';
import { Router } from 'preact-router';

//Scenes
import Home from './Scenes/Home';
import Profile from './Scenes/Profile';

//Components
import Header from './Components/Header';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
