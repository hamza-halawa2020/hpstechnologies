@echo off
cd /d "%~dp0"
set PORT=8099
set OPEN_BROWSER=1
node server.js
pause
