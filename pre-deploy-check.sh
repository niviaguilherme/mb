#!/bin/bash

echo "🔍 Verificando versões de dependências..."
npm list next react react-dom

echo "🧹 Limpando cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "📦 Instalando dependências..."
npm install

echo "🔨 Executando build..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build bem-sucedido!"
  echo "Seu projeto está pronto para ser implantado na Vercel."
else
  echo "❌ Build falhou localmente. Verifique os logs acima."
fi 