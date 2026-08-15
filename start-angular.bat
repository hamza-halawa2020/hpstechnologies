@echo off
cd /d "%~dp0angular-site"
cmd /c npm start -- --host 127.0.0.1 --port 4301
pause
