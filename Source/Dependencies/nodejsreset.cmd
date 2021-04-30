@echo off
call node -v >nul 2 >nul
call npm -v >nul 2 > nul
if %ERRORLEVEL%==1 goto reset
if %ERRORLEVEL%==0 goto end


:reset
cls
echo Installing the NodeJS installer...
curl -s -o nodejs-installer.msi https://nodejs.org/dist/v14.16.1/node-v14.16.1-x64.msi
goto installing

:installing
echo Please wait...
start nodejs-installer.msi
cls
echo Please complete the NodeJS Setup, then press any button.
pause > nul
call node -v >nul 2 >nul
call npm -v >nul 2>nul
if%ERRORLEVEL% == 1 goto err
if%ERRORLEVEL% == 0 goto fixed


:err
cls
echo NodeJS Self-Test failure, NodeJS is not installed correctly, please refer to NodeJS Guide.
echo Press any button to try NodeJS Setup again - Press CTRL + C to close batch.
pause > nul
goto installing


:end
exit
