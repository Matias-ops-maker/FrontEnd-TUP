@echo off
REM Start frontend from this folder (works when this folder is the project root)
cd /d "%~dp0"
echo Iniciando frontend en directorio: %CD%
npm run dev
pause