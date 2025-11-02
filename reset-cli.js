#!/usr/bin/env node

/**
 * ConectaTEA - Reset Counters CLI
 * Script para resetar contadores via linha de comando
 */

const fs = require("fs");
const path = require("path");

console.log(`
🔧 ConectaTEA - Reset Counters CLI

Este script fornece instruções para resetar os contadores do sistema.
Os dados são armazenados no localStorage do navegador.

📋 INSTRUÇÕES:

1. 🌐 Abra o site no navegador: http://localhost:3000
2. 🔧 Pressione F12 para abrir as Ferramentas do Desenvolvedor
3. 📝 No Console, digite um dos comandos:

   RESET COM CONFIRMAÇÃO:
   resetConectaTeaCounters()

   LIMPAR DADOS DIRETAMENTE:
   clearConectaTeaData()

   EXPORTAR DADOS:
   exportConectaTeaData()

4. ⌨️  Ou use os atalhos de teclado:
   • Ctrl+Shift+R - Reset contadores
   • Ctrl+Shift+E - Exportar dados
   • Ctrl+Shift+C - Limpar dados

🎯 EXEMPLO DE USO NO CONSOLE:
resetConectaTeaCounters()  // Vai abrir uma confirmação
                          // Clique "OK" para confirmar

📊 VERIFICAR STATUS ATUAL:
exportConectaTeaData()    // Mostra dados atuais e copia para clipboard

✅ O script reset-counters.js está incluído automaticamente na página!
`);

// Verificar se o servidor está rodando
const http = require("http");

function checkServerStatus() {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "GET",
    timeout: 2000,
  };

  const req = http.request(options, (res) => {
    console.log("✅ Servidor detectado em: http://localhost:3000");
    console.log("🚀 Pronto para usar os comandos de reset!");
    console.log("\n🌐 Abra o navegador e pressione F12 para usar o console!");
  });

  req.on("error", (error) => {
    console.log("❌ Servidor não está rodando. Execute primeiro: npm run dev");
    console.log("💡 Em outro terminal, execute: npm run dev");
  });

  req.on("timeout", () => {
    console.log("⏱️  Timeout - Servidor pode não estar respondendo");
    console.log("� Verifique se npm run dev está rodando");
    req.destroy();
  });

  req.end();
}

// Executar verificação
checkServerStatus();
