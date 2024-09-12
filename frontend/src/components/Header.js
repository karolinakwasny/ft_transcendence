import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<header>
			<div className="logo">
				<img src="assets/gweeyam.png" alt="Pong Icon" className="icon" />
				<span>Pong</span>
			</div>
			<nav className="menu">
				<a href="#home">Home</a>
				<a href="#play">Play</a>
				<a href="#profile">Profile</a>
				<a href="#about">About</a>
				<a href="#logout" className="logout-button">Logout</a>
			</nav>
		</header>
	);
};

export default Header;
