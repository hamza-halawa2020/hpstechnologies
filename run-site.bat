@echo off
cd /d "%~dp0"
set PORT=8080
set OPEN_BROWSER=1
node server.js
pause
