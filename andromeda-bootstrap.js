// 🚀 INICIALIZADOR DA ANDRÔMEDA
// Carrega a configuração primeiro, depois o núcleo
async function carregarAndromeda() {
    await import("./andromeda-config.js");
    await import("./andromeda-core.js");
    window.Andromeda = new AndromedaCore();
}

// Inicia automaticamente quando a página carregar
document.addEventListener("DOMContentLoaded", carregarAndromeda);
