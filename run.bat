@echo off
where node > NUL 2> NUL
if %errorlevel% NEQ 0 (
    echo You need to install Node.js v24 or above to run this app
) else (
    cd mononokeGenerator
    npm i
    npm run dev
)
