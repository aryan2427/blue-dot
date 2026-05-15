# Run Llama 3 locally with Ollama
# Requires Ollama installed and available in PATH.

Set-Location "$PSScriptRoot"

Write-Host "====================================="
Write-Host " Starting Ollama Llama 3"
Write-Host "====================================="
Write-Host ""

# Check if Ollama is installed
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Ollama is not installed or not added to PATH."
    Write-Host "Download Ollama from:"
    Write-Host "https://ollama.com"
    exit
}

# Check if llama3 model exists
Write-Host "Checking for llama3 model..."

$modelExists = ollama list | Select-String "llama3"

if (-not $modelExists) {
    Write-Host ""
    Write-Host "📥 llama3 model not found."
    Write-Host "Pulling llama3 model..."
    ollama pull llama3
}

Write-Host ""
Write-Host "✅ Starting llama3 locally..."
Write-Host ""

# Run model
ollama run llama3