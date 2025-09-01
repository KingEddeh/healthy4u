# Healthy4U

A Quasar-based mobile application for health management, featuring QR code scanning, user profiles, and document tracking to promote a healthy lifestyle.

## ✨ Key Features

- **User Authentication**: Secure registration and sign-in for personalized access.
- **Profile Management**: Create and manage detailed health profiles, including personal details and history.
- **QR Code Scanning**: Scan QR codes to quickly access health-related data, recipes, or product information.
- **Document Management**: Store, view, and organize important health documents and records.
- **Mobile-First Design**: Optimized for mobile devices with Capacitor for native app deployment.

## ⚙️ Tech Stack

- **Frontend**: Vue.js, Quasar Framework
- **Language**: TypeScript
- **Mobile**: Capacitor
- **Build Tools**: Vite, PostCSS
- **Styling**: SCSS
- **Linting**: ESLint

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 16 or higher
- npm (Node package manager)

### Clone Repository

```bash
git clone https://github.com/KingEddeh/healthy4u.git
```

### Navigate to Directory

```bash
cd healthy4u/frontend
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npx quasar dev
```

### For Mobile Build

```bash
npx quasar build -m capacitor -T android
```

Then, follow Capacitor setup instructions for Android/iOS deployment.

## 🏃 Usage

- Sign up or sign in to access personalized features.
- Navigate to the Profiles section to create and manage your health profile.
- Use the QR Scanner page to scan codes for instant health information.
- Access the Documents page to upload and view health-related files.
- Explore the Menu for quick navigation to different app sections.

### Example: Scanning a QR Code

To scan a QR code, go to the QR Scanner page, allow camera permissions, and point at a QR code to retrieve data.
