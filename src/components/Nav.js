import React, { Component } from 'react';
import logo from '../static/images/walmart_logo.png';
import { Link } from 'react-router-dom';
class Nav extends Component {

	render() {
		return (
			<nav>
				<div className="nav-container">
					<div className="flex-container">
						<Link to='/'>
							<img className="nav-logo" src={logo} alt='Walmart Logo'/>
						</Link>
						<p className="nav-account">
							Hi Guest!
						</p>
					</div>
				</div>
			</nav>
		)
	}
	
}

export default Nav;