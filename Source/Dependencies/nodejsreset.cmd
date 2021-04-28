@echo off
node -v > nul
npm -v > nul
if%ERRORLEVEL% == 9009 goto reset


:reset
cls
echo Installing the NodeJS installer...
curl -o nodejs-installer.msi https://nodejs.org/dist/v14.16.1/node-v14.16.1-x64.msi
goto installing

:installing
start nodejs-installer.msi
echo Please complete the NodeJS Setup, then press any button.
pause > nul
node -v > nul
npm -v > nul
if&ERRORLEVEL% == 9009 goto err
if%ERRORLEVEL% == 0 goto fixed


:err
cls
echo NodeJS Self-Test failure, NodeJS is not installed correctly, please refer to NodeJS Guide.
echo Press any button to try NodeJS Setup again - Press CTRL + C to close batch.
pause > nul
goto installing
