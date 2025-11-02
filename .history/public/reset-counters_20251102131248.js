/**
 * ConectaTEA - Reset Counters Script
 * Script para reiniciar a contabilização de cliques
 */

// Reset all click data and provide feedback
function resetClickCounters() {
  // Clear localStorage data
  localStorage.removeItem("conectatea-feature-clicks");
  localStorage.removeItem("conectatea-pricing-clicks");

  // Reset in-memory counters if they exist
  if (typeof clickedFeatures !== "undefined") {
    Object.keys(clickedFeatures).forEach((key) => (clickedFeatures[key] = 0));
  }

  if (typeof clickedPricing !== "undefined") {
    Object.keys(clickedPricing).forEach((key) => (clickedPricing[key] = 0));
  }

  // Update UI if function exists
  if (typeof updateClickCountsUI === "function") {
    updateClickCountsUI();
  }

  // Show visual feedback
  showNotification("Contadores reiniciados com sucesso!", "success");

  // Log for debugging
  console.log("[v0] All click counters have been reset to zero");

  return true;
}

// Show notification function
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add to body
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

// Admin function to reset via console
function adminResetCounters() {
  const confirm = window.confirm(
    "Tem certeza que deseja reiniciar todos os contadores? Esta ação não pode ser desfeita."
  );

  if (confirm) {
    resetClickCounters();
    console.log("[ADMIN] Counters reset by admin command");
    return "✅ Contadores reiniciados com sucesso!";
  } else {
    console.log("[ADMIN] Reset cancelled by user");
    return "❌ Operação cancelada pelo usuário";
  }
}

// Clear data without confirmation (for development)
function clearClickDataDirect() {
  localStorage.removeItem("conectatea-feature-clicks");
  localStorage.removeItem("conectatea-pricing-clicks");
  console.log("[DEV] Click data cleared directly from localStorage");

  // Reload page to reset everything
  if (
    confirm("Dados limpos! Deseja recarregar a página para ver as mudanças?")
  ) {
    window.location.reload();
  }
}

// Export data for backup
function exportClickData() {
  const featureData = localStorage.getItem("conectatea-feature-clicks");
  const pricingData = localStorage.getItem("conectatea-pricing-clicks");

  const exportData = {
    timestamp: new Date().toISOString(),
    features: featureData ? JSON.parse(featureData) : {},
    pricing: pricingData ? JSON.parse(pricingData) : {},
  };

  console.log("📊 Dados de cliques exportados:", exportData);

  // Copy to clipboard if possible
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(JSON.stringify(exportData, null, 2))
      .then(() =>
        showNotification(
          "Dados copiados para a área de transferência!",
          "success"
        )
      )
      .catch(() =>
        console.log("Não foi possível copiar para a área de transferência")
      );
  }

  return exportData;
}

// Import data from backup
function importClickData(data) {
  try {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    if (data.features) {
      localStorage.setItem(
        "conectatea-feature-clicks",
        JSON.stringify(data.features)
      );
    }

    if (data.pricing) {
      localStorage.setItem(
        "conectatea-pricing-clicks",
        JSON.stringify(data.pricing)
      );
    }

    showNotification("Dados importados com sucesso!", "success");
    console.log("📥 Dados importados:", data);

    // Update UI if function exists
    if (typeof updateClickCountsUI === "function") {
      updateClickCountsUI();
    }

    return true;
  } catch (error) {
    console.error("Erro ao importar dados:", error);
    showNotification("Erro ao importar dados!", "error");
    return false;
  }
}

// Global functions for easy access
window.resetConectaTeaCounters = adminResetCounters;
window.clearConectaTeaData = clearClickDataDirect;
window.exportConectaTeaData = exportClickData;
window.importConectaTeaData = importClickData;

// Add keyboard shortcuts
document.addEventListener("keydown", (event) => {
  // Ctrl+Shift+R - Reset counters
  if (event.ctrlKey && event.shiftKey && event.key === "R") {
    event.preventDefault();
    adminResetCounters();
  }

  // Ctrl+Shift+E - Export data
  if (event.ctrlKey && event.shiftKey && event.key === "E") {
    event.preventDefault();
    exportClickData();
  }

  // Ctrl+Shift+C - Clear data directly
  if (event.ctrlKey && event.shiftKey && event.key === "C") {
    event.preventDefault();
    clearClickDataDirect();
  }
});

// Log available commands when script loads
console.log(`
🔧 ConectaTEA Admin Commands Loaded:

📊 CONTADORES:
• resetConectaTeaCounters() - Reinicia todos os contadores (com confirmação)
• clearConectaTeaData() - Limpa dados diretamente (com reload)

📤 EXPORTAR/IMPORTAR:
• exportConectaTeaData() - Exporta dados para backup
• importConectaTeaData(data) - Importa dados de backup

⌨️  ATALHOS DE TECLADO:
• Ctrl+Shift+R - Reiniciar contadores
• Ctrl+Shift+E - Exportar dados  
• Ctrl+Shift+C - Limpar dados diretamente

📝 Exemplo de importação:
importConectaTeaData({
  features: { metas: 5, comunicacao: 3, relatorios: 2, ia: 1 },
  pricing: { essencial: 10, profissional: 7 }
});
`);
