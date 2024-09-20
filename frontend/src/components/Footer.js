import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col d-flex justify-content-start">
						<a href="https://github.com/LukasKava/ft_transcendence" className="footer-link">GitHub</a>
						<a href="https://42wolfsburg.de/" className="footer-link">About 42</a>
					</div>
					<div className="col d-flex justify-content-end">
						<input type="checkbox" className="checkbox" id="checkbox" />
						<label for="checkbox" className="checkbox-label">
							<i class="fas fa-sun" />
							<i class="fas fa-moon" />
							<span className="ball" />
						</label>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
