import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<header>
			<div className="logo">
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none"
				strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
				viewBox= "0 0 24 24"
				clipRule="evenodd" className="icon" stroke="currentColor" >
					<path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
				</svg>
				<span className="siteName">
					<Link to="/">Pong</Link>
				</span>
			</div>
			<nav className="menu">
				<Link to="/">Home</Link>
				<Link to="/play">Play</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/about">About</Link>
				<a href="#" className="authenticate-button">Log in</a>
			</nav>
		</header>
	);
};

export default Header;
