@echo off
echo NodeJS Self-Testing...
call npm -v> NUL
call node -v> NUL
if %ERRORLEVEL% == 9009 goto err
goto start



:err
cls
echo NodeJS Self-Test failure.
echo Starting NodeJS reinstall procedure...
cd Source/Dependencies
timeout /t 2 /nobreak > NUL
call nodejsreset.cmd

:start
echo NodeJS Self-Test ended, Launching app...
cd Source
call npm install discord.js > nul
call node index
