import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<header>
			<div className="logo">
				<img src="assets/gweeyam.png" alt="Pong Icon" className="icon" />
				<span>Pong</span>
			</div>
			<nav className="menu">
				<Link to="/">Home</Link>
				<Link to="/play">Play</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/about">About</Link>
				<a href="#logout" className="logout-button">Logout</a>
			</nav>
		</header>
	);
};

export default Header;
