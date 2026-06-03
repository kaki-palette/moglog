@echo off
setlocal
chcp 65001 >nul

cd /d "%~dp0"
set "LOG=%CD%\mogulog_flutter_run_log.txt"

echo MoguLog Flutter Android launcher started. > "%LOG%"
echo Project folder: %CD% >> "%LOG%"

echo.
echo ========================================
echo  MoguLog Flutter Android
echo ========================================
echo.

where flutter >nul 2>nul
if errorlevel 1 (
  echo Flutter SDK was not found in PATH.
  echo Install Flutter SDK, then run:
  echo   flutter doctor
  echo.
  echo Flutter SDK was not found in PATH. >> "%LOG%"
  pause
  exit /b 1
)

if not exist ".metadata" (
  echo Creating Flutter platform files for Android...
  echo Creating Flutter platform files for Android. >> "%LOG%"

  if exist ".mogulog_flutter_backup" rmdir /s /q ".mogulog_flutter_backup" >> "%LOG%" 2>&1
  mkdir ".mogulog_flutter_backup" >> "%LOG%" 2>&1
  xcopy /E /I /Y "lib" ".mogulog_flutter_backup\lib" >> "%LOG%" 2>&1
  copy /Y "pubspec.yaml" ".mogulog_flutter_backup\pubspec.yaml" >> "%LOG%" 2>&1
  copy /Y "analysis_options.yaml" ".mogulog_flutter_backup\analysis_options.yaml" >> "%LOG%" 2>&1
  copy /Y "README.md" ".mogulog_flutter_backup\README.md" >> "%LOG%" 2>&1
  copy /Y "run_mogulog.bat" ".mogulog_flutter_backup\run_mogulog.bat" >> "%LOG%" 2>&1
  copy /Y "run_flutter_android.bat" ".mogulog_flutter_backup\run_flutter_android.bat" >> "%LOG%" 2>&1

  flutter create --platforms=android --project-name mogulog_flutter . >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo flutter create failed. See:
    echo   %LOG%
    type "%LOG%"
    pause
    exit /b 1
  )

  if exist "lib" rmdir /s /q "lib" >> "%LOG%" 2>&1
  xcopy /E /I /Y ".mogulog_flutter_backup\lib" "lib" >> "%LOG%" 2>&1
  copy /Y ".mogulog_flutter_backup\pubspec.yaml" "pubspec.yaml" >> "%LOG%" 2>&1
  copy /Y ".mogulog_flutter_backup\analysis_options.yaml" "analysis_options.yaml" >> "%LOG%" 2>&1
  copy /Y ".mogulog_flutter_backup\README.md" "README.md" >> "%LOG%" 2>&1
  copy /Y ".mogulog_flutter_backup\run_mogulog.bat" "run_mogulog.bat" >> "%LOG%" 2>&1
  copy /Y ".mogulog_flutter_backup\run_flutter_android.bat" "run_flutter_android.bat" >> "%LOG%" 2>&1
)

echo Installing Flutter packages...
flutter pub get >> "%LOG%" 2>&1
if errorlevel 1 (
  echo flutter pub get failed. See:
  echo   %LOG%
  type "%LOG%"
  pause
  exit /b 1
)

echo.
echo Connected devices:
flutter devices
echo.
echo Starting Flutter app. Select a device if Flutter asks.
flutter run >> "%LOG%" 2>&1
if errorlevel 1 (
  echo flutter run failed. See:
  echo   %LOG%
  type "%LOG%"
  pause
  exit /b 1
)

pause
