![Minipong banner](https://github.com/erwkuvi/ft_transcendence/blob/main/minipong_banner.png)

# ft_transcendence

A full-stack web application, integrating modern web technologies and working across both front-end and back-end systems.

This project is part of the core curriculum at 42 Schools and aims to familiarize students with common technologies used in full-stack development.

---

## Live Demo

Check out the live version of the project here: [**Live Demo**](https://transcendence-cs0d.onrender.com/)

**Note:**  
- This application is hosted entirely on free-tier services.  
- As a result, the initial load may take **50 seconds or more** if the app has been inactive.  
- This delay happens because the server enters a sleep state after **15 minutes** of inactivity.  
- Once active, the app runs smoothly.

---

## Deployment Details

The project is fully deployed using free-tier cloud services:

- **[Neon](https://neon.tech/):** PostgreSQL database hosting.
- **[Cloudinary](https://cloudinary.com/):** Image storage and delivery.
- **[Render](https://render.com/):** Hosting for both the frontend (React) and backend (Django) using containerized services via Blueprints.

---

## Technologies Used

| System           | Technologies                   |
|-----------------|--------------------------------|
| **Backend**     | Django (REST Framework) - Python |
| **Frontend**    | React - JavaScript             |
| **Database**    | PostgreSQL                     |
| **Reverse Proxy** | Nginx                        |
| **Containerization** | Docker & Docker Compose |


---

## My Role in This Project

- Set up Django and PostgreSQL.
- Set up the deployment environment using Docker containers and Docker Compose.
- Implemented friend service in backend.
- Developed most of the frontend.
- Deployed the project to the internet.

This project was a team effort. I would like to thank my team members for their valuable contributions: Erwin Küchel for his work on Django and NGINX, and Lukas Kavaliauskis for creating the 3D game. Their efforts were instrumental in the success of this project.

---

## Features

### Standard User Management

![Signup](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/signup-login.gif)

- Users can securely register and log in.
- Each user can select a unique display name for tournaments.
- Users can update their profile and upload an avatar (default option available).
- Users can add friends and view their online status.
- Each profile displays match history, wins, and losses.

![Update information](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/update-feat.gif)

---

### Remote Authentication

- Implemented secure remote authentication via the 42 API.
- Ensured all credentials and permissions were properly handled.
- Designed a user-friendly login and authorization flow.

![Remote Authentication](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/remote-auth.gif)

---

### Two-Factor Authentication & JWT

- 2FA was implemented to enhance security alongside JWT tokens.
- Users are required to provide a secondary verification method (e.g., OTP code).
- Easy setup process using authenticator apps like Google/Microsoft Authenticator.

![2FA Authentication](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/otp-feat.gif)

---

### Advanced 3D Techniques

- The pong game was built using Three.js to achieve a 3D visual effect.

![3D Feature](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/3d-techniques.gif)

---

### Game Customization Options

- Users can select different maps for Pong.
- A default option is available if no selection is made.

---

### Multi-Language Support

- The web application supports four languages to accommodate a broad audience.
- Users can switch languages easily through a built-in language selector.
- Users can save their preferred language for future visits.

![Multiple language support](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/language.gif)

---

### Accessibility for Visually Impaired Users

- Screen reader support and assistive technology integration (ARIA labels).
- Clear, descriptive alt text for images.
- High-contrast color scheme for improved readability.
- Keyboard navigation and proper focus management.
- Adjustable text size options.

![Accessibility](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/accessibility.gif)

---

### Responsive Design

- The website is fully responsive, adapting to different screen sizes and orientations.
- Ensures a consistent user experience on desktops, laptops, tablets, and smartphones.

![Responsiveness](https://github.com/erwkuvi/ft_transcendence/blob/main/assets/responsiveness.gif)

---

![42Wolfsburg](https://42wolfsburg.de/wp-content/uploads/2023/07/Warstwa_1-1.svg)

