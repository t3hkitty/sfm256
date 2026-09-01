# Zettelkasten ID: 20260831-1133
# Project: sfm256-virtual-console
# Role: Space-safe native Windows PowerShell build script to compile assets and export custom-named APKs to Google Drive

$ErrorActionPreference = "Stop"

Write-Host "🐾 (=^･ω･^=) Initiating SFM-256 APK Compilation Sequence..." -ForegroundColor Cyan

# Configuration parameters (Syncs with persistent localStorage states)
$PackageName = "net.artkitty.sfm256"
$Version = "1.0.0"
$GDriveTarget = "G:\My Drive\myapks"
$LocalBuildApk = "android/app/build/outputs/apk/debug/${PackageName}_v${Version}_debug.apk"

# Step 1: Compile Frontend Production Assets
Write-Host "==> 1. Compiling Frontend WebGL and React Chunks..." -ForegroundColor Magenta
npm run build

# Step 2: Sync Capacitor Native Layer
Write-Host "==> 2. Syncing Assets to Android Native Container..." -ForegroundColor Magenta
npx cap sync android

# Step 3: Run Gradle Compilation Task
Write-Host "==> 3. Running Gradle assembleDebug and export Tasks..." -ForegroundColor Magenta
cd android
.\gradlew.bat assembleDebug
cd ..

# Step 4: Verify and copy binary output safely handling folder spaces
Write-Host "==> 4. Deploying compiled APK to Google Drive..." -ForegroundColor Magenta
if (-not (Test-Path $GDriveTarget)) {
    Write-Host "⚠️ Warning: Target folder '$GDriveTarget' not found! Instantiating path..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $GDriveTarget -Force | Out-Null
}

$SourceApk = "android/app/build/outputs/apk/debug/app-debug.apk"
$TargetFileName = "${PackageName}_v${Version}_debug.apk"
$DestinationPath = Join-Path $GDriveTarget $TargetFileName

if (Test-Path $SourceApk) {
    Copy-Item -Path $SourceApk -Destination $DestinationPath -Force
    Write-Host "🎉 Success! Consolidated APK exported safely to: $DestinationPath" -ForegroundColor Green
} else {
    # Scan directory for Gradle variant renames
    $CompiledApks = Get-ChildItem -Path "android/app/build/outputs/apk/debug/" -Filter "*.apk"
    if ($CompiledApks) {
        foreach ($Apk in $CompiledApks) {
            $TargetDest = Join-Path $GDriveTarget $Apk.Name
            Copy-Item -Path $Apk.FullName -Destination $TargetDest -Force
            Write-Host "🎉 Success! Renamed APK exported safely to: $TargetDest" -ForegroundColor Green
        }
    } else {
        throw "😿 Compile completed successfully, but target APK could not be resolved!"
    }
}
