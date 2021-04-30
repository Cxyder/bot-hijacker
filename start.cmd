@echo off
echo Running NodeJS Self-Test
call npm -v> NUL
call node -v> NUL
if %ERRORLEVEL% == 1 goto err
goto start



:err
cls
echo NodeJS Self-Test failure.
echo Starting NodeJS reinstall procedure...
cd Source/Dependencies
timeout /t 2 /nobreak > NUL
call nodejsreset.cmd

:start
echo NodeJS Self-Test successfully
echo Searching update for Discord.js...
cd Source
call npm --quiet install discord.js >nul 2>nul
call node index.js
