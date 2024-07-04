<h1 align="center">React-Flow</h1>

<br />
<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Reactjs" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    
</p>

Family tree is a React application designed to display a family tree using react-flow library and recoil for state management, and Tailwind CSS for styling.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Project Structure

```plaintext
react-flow-challenge
│   ├── public
│   │   └── favicon.ico
│   │   └── index.html
│   │   └── manifest.json
│   ├── src
│   │   ├── recoil
│   │   │   └── (Recoil atom files)
│   │   ├── components
│   │   │   └── (React component files)
│   │   ├── hooks
│   │   │   └── (Custom hook files)
│   │   ├── public
│   │   │   └── index.html
│   │   ├── types
│   │   │   └── (Typescript types files)
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.tsx
├── .prettierrc
├── .gitignore
└── package.json
└── tailwind.config.js
└── tsconfig.json
```


## Features

- [x] Search for nodes by their name
- [x] State management with Recoil
- [x] Styling with Tailwind CSS
- [x] Integrate [React Flow ](https://reactflow.dev/)
- [x] Input validation
- [x] UI Modals using [Antd ](https://ant.design/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/htirawi/react-flow-challenge
   npm install

## Running the Application

1. run the following command:

   ```bash
   npm start

2. The app will run in **localhost:3000** port
