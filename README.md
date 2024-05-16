# Ticker-App

Ticker-App is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to display real-time financial data using the Bitfinex API. The frontend is built with React, Vite, Recoil for state management, and Tailwind CSS for styling. The backend is powered by Node.js and Express, and it connects to a MongoDB database.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```plaintext
ticker-app
├── server
│   ├── controllers
│   │   └── (Controller files)
│   ├── models
│   │   └── (Model files)
│   ├── routes
│   │   └── (Route files)
│   ├── config
|   |     └── (Configuration files)
│   ├── server.js
├── client
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── atoms
│   │   │   └── (Recoil atom files)
│   │   ├── components
│   │   │   └── (React component files)
│   │   ├── hooks
│   │   │   └── (Custom hook files)
│   │   ├── pages
│   │   │   └── (Page component files)
│   │   ├── utils
│   │   │   └── (Utility files)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.jsx
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .env
├── .gitignore
└── package.json
```


## Features

- Real-time financial data from Bitfinex API
- State management with Recoil
- Styling with Tailwind CSS
- Fast development with Vite
- Secure authentication with JWT
- Cron job for periodic data snapshots
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ticker-app.git
   cd ticker-app
   npm install
   cd client
   npm install

## Running the Application
   1. Ensure MongoDB is running.

2. Set up environment variables.

3. run the following command:

   ```bash
   npm run dev

4- The app will run in **localhost:3001** port
