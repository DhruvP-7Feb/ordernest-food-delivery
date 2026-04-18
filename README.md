# OrderNest 🍔

OrderNest is a full-stack, minimalist food delivery web application designed with a robust Django REST Framework backend and a lightning-fast React + Vite frontend. It features secure JWT authentication, cart management, seamless restaurant exploration, and an elegant SaaS-inspired dark mode UI.

## 🚀 Features
- **Secure Authentication**: JWT-based user login and registration.
- **Dynamic Restaurant Browsing**: Explore different restaurants and their custom menus.
- **Cart Management**: Add, remove, and adjust item quantities with conflict checks (single-restaurant cart policy).
- **Order Tracking**: Place orders and view historical order status.
- **Dark Mode**: Out-of-the-box support for a sleek, modern dark theme.
- **Admin Dashboard**: Fully configured Django Admin panel to manage Restaurants, Menus, Users, and Orders.

## 📁 Tech Stack
- **Backend:** Django, Django REST Framework (DRF), SimpleJWT, SQLite3
- **Frontend:** React JS, Vite, Tailwind CSS v4, Lucide React, Context API

---

## 💻 Getting Started

### 1. Backend Setup (Django)
Navigate to the `backend` directory and ensure your virtual environment is active.
```bash
cd backend
# With the virtual environment active (e.g. source ../venv/Scripts/activate):
python manage.py runserver
```
The Django API will be accessible at `http://localhost:8000/`.
> **Admin Access:** You can access the backend portal at `/admin/` (Username: `admin` / Password: `admin123`).

### 2. Frontend Setup (React)
Navigate to the `frontend` directory and start the Vite development server.
```bash
cd frontend
npm install
npm run dev
```
The frontend will immediately be accessible at `http://localhost:5173/`.

---

## 🎨 UI Highlight
The aesthetic of **OrderNest** intentionally deviates from the heavy orange/red interfaces of standard delivery apps. It embraces a slate & emerald utility-driven palette, modern shadows, rounded components, and standard micro-animations.

**Developed by Dhruv.**
