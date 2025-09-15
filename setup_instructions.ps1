Write-Host "[INFO] Executando setup automático..." -ForegroundColor Cyan

# Caminho raiz do projeto (ajusta se precisar)
$root = "C:\ProjetosVictor\Back-end\nebula-api"

# Lista todas as pastas dentro do projeto que contenham package.json
$serviceFolders = Get-ChildItem -Path $root -Recurse -Directory | Where-Object {
    Test-Path "$($_.FullName)\package.json"
}

foreach ($folder in $serviceFolders) {
    Write-Host "[INFO] Entrando em $($folder.FullName)" -ForegroundColor Yellow
    Set-Location $folder.FullName

    Write-Host "[STEP] Instalando dependências (npm install)..." -ForegroundColor Green
    npm install

    Write-Host "[STEP] Gerando Prisma (npx prisma generate)..." -ForegroundColor Green
    npx prisma generate
}

# Volta para a raiz
Set-Location $root

Write-Host "[INFO] Subindo containers Docker..." -ForegroundColor Cyan
docker compose up --build
