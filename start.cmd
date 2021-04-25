@echo off
echo Please make sure you have installed on your pc the last version of NodeJS before continuing...
PAUSE
echo Getting things ready...
cd Source
call npminstaller.cmd
node index
