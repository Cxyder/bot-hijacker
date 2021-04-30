@echo off
:start
rem PrintBoxAt 2 2 23 48 1
rem PrintBoxAt 2 51 23 29 1
rem PrintBoxAt 2 51 3 29 1
rem PrintBoxAt 7 4 17 44 1
rem PrintColorAt Important.txt 3 53 7 0
rem PrintColorAt Welcome to Bot Hijacker Guided Setup! 4 5 7 0
rem PrintColorAt Install [X] 9 6 7 0
rem PrintColorAt Search for missing dependencies [X] 11 6 7 0
rem PrintColorAt Close [X] 15 6 7 0
rem PrintColorAt Hello! Thanks for 6 53 7 0
rem PrintColorAt downloading my app! 7 53 7 0
rem PrintColorAt If you encounter any 8 53 7 0
rem PrintColorAt error please report on 9 53 7 0
rem PrintColorAt repository! 10 53 7 0
rem PrintColorAt To use this menu use 11 53 7 0
rem PrintColorAt your mouse 12 53 7 0
rem MouseCMD 6,9,16,9 6,11,40,11 6,15,14,15
rem locate 25 1
if %result%==1 goto Install
if %result%==2 goto SelfTest
if %result%==3 goto End

:Install
cls
rem PrintBoxAt 2 2 5 78 1
rem PrintColorAt Installing "Bot Hijacker" on your pc, please wait... 4 4 7 0
rem Locate 8 1
echo Creating a new folder for installation...
mkdir BotHijacker
cd BotHijacker
echo Downloading "start.cmd" from Git Repository...
curl -s -o start.cmd https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/start.cmd
echo Downloading "important.txt" from Git Repository...
curl -s -o important.txt https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/important.txt
echo Creating a new folder for Source files...
mkdir Source
cd Source
echo Downloading scripts from Git Repository...
curl -s -o index.js https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/index.js
curl -s -o npminstaller.cmd https://github.com/Cxyder/bot-hijacker/blob/main/Source/npminstaller.cmd
curl -s -o package-lock.json https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/package-lock.json
curl -s -o package.json https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/package.json
echo Creating a new folder for Dependencies...
mkdir Dependencies
cd Dependencies
echo Downloading NodeJS...
curl -s -o nodejsreset.cmd https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/Dependencies/nodejsreset.cmd
curl -s -o nodejs-installer.msi https://nodejs.org/dist/v14.16.1/node-v14.16.1-x64.msi
echo Please wait..
start nodejs-installer.msi
echo Please complete the NodeJS setup on your screen, then press any button to continue...
pause>nul
echo NodeJS Self-Test running...
call node -v>nul 2>nul
call npm -v>nul 2>nul
if %ERRORLEVEL%==1 goto NodeJSFail
if %ERRORLEVEL%==0 goto InstallationEnd

:NodeJSFail
cls
rem Slot 9
rem PrintBoxAt 5 20 17 61 1
rem PrintColorAt ERROR DURING NODEJS SELF-TEST 7 34 7 0
rem PrintColorAt This type of error can be generated due to an error during 11 22 7 0
rem PrintColorAt the NodeJS Setup or an incorrect NodeJS installation. 12 22 7 0
rem PrintColorAt Please press the button below to retry to install NodeJS. 13 22 7 0
rem PrintColorAt RETRY [X] 19 45 7 0
rem MouseCMD 45,19,54,19
rem Locate 25 1
if %result%==1 goto NodeJSSetup

:NodeJSSetup
cls
rem slot 4
echo Please wait...
start nodejs-installer.msi
cls
rem PrintBoxAt 2 2 5 78 1
rem PrintColorAt NodeJS Setup 4 4 7 0
rem PrintBoxAt 10 21 11 44 1
rem PrintColorAt END [X] 19 40 7 0
rem PrintColorAt Please complete the setup on your screen 13 23 7 0
rem PrintColorAt If any error occur during the setup 14 23 7 0
rem PrintColorAt Please report the issue. 15 23 7 0
rem MouseCMD 40,19,47,19
rem locate 25 1
if%result%==1 goto SetupJSChecker

:InstalledJS
cls
call node -v>nul 2>nul
call npm -v>nul 2>nul
if %ERRORLEVEL%==1 goto NodeJSFFail
if %ERRORLEVEL%==0 goto InstallationEnd

:InstallationEnd
cls
rem slot 5
rem PrintBoxAt 6 21 15 40 1
rem PrintColorAt INSTALLATION SUCCESFULL 8 29 7 0
rem PrintColorAt The installation was succesfull 12 25 7 0
rem PrintColorAt You may now run the application 13 25 7 0
rem PrintColorAt [EXIT] 18 38 7 0
rem MouseCMD 38,18,44,18
if %result%==1 goto End


:SelfTest
cls
call node -v>nul 2>nul
call npm -v>nul 2>nul
if %ERRORLEVEL%==1 goto NodeJSFail
if %ERRORLEVEL%==0 goto Ok

:Ok
rem slot 5
rem PrintBoxAt 6 21 15 40 1
rem PrintColorAt DEPENDENCIES ARE INSTALLED 8 30 7 0
rem PrintColorAt No error occured during self test. 12 25 7 0
rem PrintColorAt If you are encountering errors 13 25 7 0
rem PrintColorAt please try re-installing the app 14 25 7 0
rem PrintColorAt or report the issue. 15 25 7 0
rem PrintColorAt [BACK] 18 36 7 0
rem MouseCMD 36,18,43,18
if %result%==1 goto End


:End
exit