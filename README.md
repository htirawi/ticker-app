<h1 align="center">Ticker App</h1>

<br />
<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Reactjs" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
       <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDb" />
</p>

Ticker-App is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to display real-time financial data using the Bitfinex API. The frontend is built with React, Vite, Recoil for state management, and Tailwind CSS for styling. The backend is powered by Node.js and Express, and it connects to a MongoDB database.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)

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

- [x] Real-time financial data from Bitfinex API
- [x] State management with Recoil
- [x] Styling with Tailwind CSS
- [x] Fast development with Vite
- [x] Secure authentication with JWT
- Cron job for periodic data snapshots
- [x] Responsive design

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
