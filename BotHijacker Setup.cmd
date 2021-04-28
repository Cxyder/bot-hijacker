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
