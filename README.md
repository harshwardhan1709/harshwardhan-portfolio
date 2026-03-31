
# HW-OS // FullStack Architect Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-Access_System-FEC700?style=for-the-badge&logo=vercel&logoColor=black)](https://harshwardhan1709.github.io/harshwardhan-portfolio/)

[![Repository](https://img.shields.io/badge/GitHub-View_Source-01140D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/harshwardhan1709/harshwardhan-portfolio)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

A high-performance, brutalist developer portfolio engineered to showcase FullStack architecture, complex DOM manipulation, and advanced UI/UX physics. This is not a static webpage; it is an interactive environment simulating a native developer operating system.

## ⚡ Core Architecture & Features

* **Global Command Center (`Ctrl+K`):** A globally accessible, hidden terminal overlay built with GSAP `autoAlpha` animations. It features an active command parser capable of routing the user through the application via simulated UNIX commands.
* **Live GitHub Integration:** The dossier section connects directly to the GitHub REST API, automatically fetching and rendering the 4 most recently pushed repositories with resilient fallback cache support.
* **High-Performance Raw DOM Typing:** Custom-built typing engine utilizing direct `useRef` DOM manipulation to bypass React state bottlenecks, smoothly typing complex Java/SQL/React code snippets at 60fps.
* **Interactive IDE Sandbox:** A 3-pane responsive logic execution environment. Features a virtual file system, dynamic syntax highlighting, and a simulated compilation terminal that "runs" the selected code.
* **Advanced Responsive Parallax:** * *Desktop:* Utilizes GSAP `pin: true` for a horizontal, gallery-style scroll override in the Projects section.
  * *Mobile:* Gracefully falls back to CSS `position: sticky` to create a native-feeling, overlapping deck-of-cards stack to preserve screen real estate.
* **Tactile Footer Architecture:** Features a live browser-computed local timezone clock (Bengaluru, IST), GSAP magnetic hover buttons, and dynamic React state-to-`mailto:` data injection.

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router DOM v7 (Hash/Basename configured for GH-Pages)
* **Styling:** Tailwind CSS (Custom Dark/Golden Brutalist Theme)
* **Animation Engine:** GSAP (GreenSock Animation Platform) + ScrollTrigger
* **Icons:** `react-icons/fi` (Feather Icons)
* **Notifications:** `react-hot-toast`

## 🚀 Local Development Setup

To run this system locally, follow these execution protocols:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/harshwardhan1709/harshwardhan-portfolio.git](https://github.com/harshwardhan1709/harshwardhan-portfolio.git)
   cd harshwardhan-portfolio
Install dependencies:

Bash
npm install
Initialize the local server:

Bash
npm run dev
Access the environment:
Open your browser and navigate to the localhost port provided by Vite (typically http://localhost:5173).

🌐 Deployment Protocol (GitHub Pages)
This project is configured with a continuous deployment script via the gh-pages package.

To deploy updates to the live URL:

Ensure all changes are committed and pushed to the main branch.

Run the deployment sequence:

Bash
npm run deploy
The system will automatically build the dist directory and push it to the gh-pages branch.



Architected and Engineered by Harsh Wardhan.