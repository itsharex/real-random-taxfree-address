@echo off
cd /d "%~dp0"

echo Starting KY local server (root: %cd%)
echo.

REM Check if Python 3 is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python -c "import sys; sys.exit(0 if sys.version_info >= (3, 0) else 1)" >nul 2>&1
    if %errorlevel% equ 0 (
        echo Found Python 3
        echo Open http://localhost:8000/  (KY index - src module test)
        echo Press Ctrl+C to stop
        echo.
        timeout /t 2 /nobreak >nul
        start http://localhost:8000/
        python -m http.server 8000
        exit /b 0
    )
)

REM Check if Python 2 is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python -c "import sys; sys.exit(0 if sys.version_info < (3, 0) else 1)" >nul 2>&1
    if %errorlevel% equ 0 (
        echo Found Python 2
        echo Open http://localhost:8000/
        echo Press Ctrl+C to stop
        echo.
        timeout /t 2 /nobreak >nul
        start http://localhost:8000/
        python -m SimpleHTTPServer 8000
        exit /b 0
    )
)

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Found PHP
    echo Open http://localhost:8000/
    echo Press Ctrl+C to stop
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:8000/
    php -S localhost:8000
    exit /b 0
)

REM Check if Node.js is available
where npx >nul 2>&1
if %errorlevel% equ 0 (
    echo Found Node.js
    echo Open http://localhost:8000/
    echo Press Ctrl+C to stop
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:8000/
    npx --yes http-server -p 8000
    exit /b 0
)

echo Error: No server found
echo Please install Python, PHP, or Node.js
pause
exit /b 1
