@echo off
echo Starting Resume Tailor Application...

REM Start Server
cd server
start "Resume Tailor Server" npm run dev

REM Start Client
cd ../client
start "Resume Tailor Client" npm run dev

echo Both services started in separate windows.
pause
