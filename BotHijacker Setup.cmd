::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAnk
::fBw5plQjdG8=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+IeA==
::cxY6rQJ7JhzQF1fEqQJhZks0
::ZQ05rAF9IBncCkqN+0xwdVsFAlTi
::ZQ05rAF9IAHYFVzEqQISJw8UZA2IPWixA6d8
::eg0/rx1wNQPfEVWB+kM9LVsJDCaNKCuSD78d6+P+/aq0p1kIRII=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJGyX8VAjFC5HSRa+E2W/IqcV/u3Hy++UqVkSRN4dd5vz076PI+sW+AXXcII4xjoJyskFGFVdZhfL
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
echo -----------------------//// Bot Hijacker Installer ////-----------------------
echo Welcome to the Bot Hijacker installer, the installation should begin shortly.
timeout /t 2 /nobreak > NUL
mkdir BotHijacker
cd BotHijacker
curl -o start.cmd https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/start.cmd
curl -o important.txt https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/important.txt
mkdir Source
cd Source
curl -o index.js https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/index.js
curl -o npminstaller.cmd https://github.com/Cxyder/bot-hijacker/blob/main/Source/npminstaller.cmd
curl -o package-lock.json https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/package-lock.json
curl -o package.json https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/package.json
cls
echo -----------------------//// Bot Hijacker Installer ////-----------------------
echo The app installation has ended, dependencies installation should begin shortly...
timeout /t 2 /nobreak > NUL
mkdir Dependencies
cd Dependencies
curl -o nodejsreset.cmd https://raw.githubusercontent.com/Cxyder/bot-hijacker/main/Source/Dependencies/nodejsreset.cmd
curl -o nodejs-installer.msi https://nodejs.org/dist/v14.16.1/node-v14.16.1-x64.msi
goto userprompt

:userprompt
start nodejs-installer.msi
echo Please complete the NodeJS setup,after you completed that press any button
pause>nul
echo Testing NodeJS, please wait...
node -v>nul
npm -v>nul
if %ERRORLEVEL% == 0 goto next
if %ERRORLEVEL% == 9009 goto err

:next
call echo --------------------------------------------------------------------------------
call echo The installation was succesfull. Please read the "important.txt" file to know how to run the app
call pause > nul

:err
cls
echo Error during NodeJS installation self-test, press any button to open the installer again
pause>nul
goto userprompt
