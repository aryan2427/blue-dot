# Switch to smaller Ollama model for lower memory usage
# Uses llama3.2 instead of llama3

Set-Location "$PSScriptRoot"

Write-Host "====================================="
Write-Host " Switching to llama3.2"
Write-Host "====================================="
Write-Host ""

# Check if Ollama is installed
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Ollama is not installed or not added to PATH."
    Write-Host "Download from:"
    Write-Host "https://ollama.com"
    exit
}

Write-Host "📥 Pulling llama3.2 model..."
ollama pull llama3.2

Write-Host ""
Write-Host "✅ llama3.2 installed successfully."
Write-Host ""

# Optional .env update reminder
Write-Host "⚙️ Update your .env file if needed:"
Write-Host "OLLAMA_MODEL=llama3.2"
Write-Host ""

# Test the model
Write-Host "🧪 Running test prompt..."
Write-Host ""

ollama run llama3.2 "Hello, test message"

Write-Host ""
Write-Host "✅ llama3.2 is ready to use."