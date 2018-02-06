import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Preact Boilerplate</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Home {style}</Link>
					<Link activeClassName={style.active} href="/profile">Me</Link>
					<Link activeClassName={style.active} href="/profile/test">Test</Link>
				</nav>
			</header>
		);
	}
}