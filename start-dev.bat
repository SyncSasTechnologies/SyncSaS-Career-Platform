@echo off
REM Quick start script for Freelance Gigs Marketplace
REM This script starts both backend and frontend servers

echo.
echo ====================================
echo Freelance Gigs Marketplace
echo Quick Start Script
echo ====================================
echo.

REM Check if running from correct directory
if not exist "backend" (
    echo Error: Please run this script from the project root directory
    echo Expected to find: ./backend
    pause
    exit /b 1
)

REM Start backend in a new terminal
echo Starting backend server...
start cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3

REM Start frontend in a new terminal
echo Starting frontend server...
start cmd /k "cd web-app && npm run dev"

echo.
echo ====================================
echo Servers started!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key in either terminal to stop the server
echo ====================================
echo.

pause
