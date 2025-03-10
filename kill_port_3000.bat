@echo off
setlocal

REM 查找占用3000端口的进程
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    set PID=%%a
)

REM 检查是否找到了进程
if defined PID (
    echo 正在终止进程ID %PID%...
    taskkill /PID %PID% /F
    echo 进程已终止。
) else (
    echo 没有找到占用3000端口的进程。
)

endlocal
pause
