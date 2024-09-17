import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col">
						<a href="https://github.com/LukasKava/ft_transcendence" className="footer-link">Source code</a>
						<a href="https://42wolfsburg.de/" className="footer-link">About 42</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
