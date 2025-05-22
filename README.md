# Suraksha Setu

<p align="left">
	<img src="https://img.shields.io/github/last-commit/Raxy777/disaster-management-system?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Raxy777/disaster-management-system?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Raxy777/disaster-management-system?style=default&color=0080ff" alt="repo-language-count">
</p>

**Suraksha Setu** is a comprehensive platform designed to facilitate disaster relief efforts. It connects volunteers, administrators, and the public to streamline communication, resource management, and emergency response during crises.

### 🎯 Target Audience:

- **General Public:** Individuals seeking information, alerts, and resources related to disasters.
- **Volunteers:** People looking to offer their skills and time to help with relief efforts.
- **Administrators:** Organizations and personnel responsible for coordinating and managing disaster response.
---

## 📖 Overview

Suraksha Setu serves as a unified portal for disaster communication and coordination, built with modern web technologies to ensure scalability, speed, and security.

---

## ✨ Features

### 🧍 Public Users
- View disaster alerts and updates.
- Access a map of affected areas and resource locations.
- Find information on various disaster types.
- Submit incident or resource reports.
- Access a list of emergency resources.
- Learn how to volunteer or donate.

### 🧑‍🤝‍🧑 Registered Volunteers
- Create and manage a volunteer profile.
- Sign up for tasks via a dedicated dashboard.
- Receive relevant notifications.

### 🧑‍💼 Administrators
- **Dashboard & Analytics:** Monitor activity and reports.
- **Alert Management:** Disseminate emergency alerts.
- **Map Management:** Update the disaster map (shelters, roads, medical).
- **Message Center:** Communicate with volunteers/stakeholders.
- **Report Review:** Evaluate incident submissions.
- **Resource Management:** Track and allocate supplies.
- **Volunteer Management:** Approve and schedule volunteers.
- **Profile & Settings:** Admin configuration panel.

---

## 🧰 Tech Stack

| Purpose             | Technology                                                                 |
|---------------------|----------------------------------------------------------------------------|
| **Framework**       | [Next.js](https://nextjs.org/)                                             |
| **Language**        | [TypeScript](https://www.typescriptlang.org/)                              |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                                   |
| **UI Components**   | [Shadcn/ui](https://ui.shadcn.com/)                                        |
| **Package Manager** | [pnpm](https://pnpm.io/)                                                   |

---

## 🚀 Getting Started

Instructions to run the project locally.

### 🛠️ Prerequisites

- Node.js (v18+ recommended)
- pnpm: `npm install -g pnpm`

### 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Raxy777/disaster-management-system.git
    cd disaster-management-system
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

A brief overview of the key directories in this project:

*   `app/`: Contains the core application logic and page definitions for different routes (e.g., `/admin`, `/volunteer`, `/alerts`). Uses the Next.js App Router.
*   `components/`: Houses reusable React components used throughout the application.
    *   `components/ui/`: Contains UI primitives, often based on Shadcn/ui.
    *   `components/admin/`: Specific components for the admin section.
    *   `components/volunteer/`: Specific components for the volunteer section.
*   `hooks/`: Stores custom React hooks for shared logic.
*   `lib/`: Contains utility functions, context providers (e.g., `auth-context.tsx`), and other shared library code.
*   `public/`: Stores static assets like images and logos.
*   `styles/`: Contains global stylesheets (though Tailwind CSS is primarily used for styling).

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to contribute code, please follow these general steps:

1.  **Fork the Project.**
2.  **Create your Feature Branch:**
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes:**
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the Branch:**
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **Open a Pull Request.**

Please ensure your code adheres to the project's coding standards and includes tests where applicable.
