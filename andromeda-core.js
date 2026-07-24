// 🧠 NÚCLEO PRINCIPAL DA ANDRÔMEDA
class AndromedaCore {
    constructor() {
        this.config = ANDROMEDA_CONFIG;
        this.arquivoAtual = window.location.pathname.split("/").pop() || "index.html";
        this.iniciar();
    }

    iniciar() {
        this.criarNavegacaoPadrao();
        this.verificarLinks();
        this.exibirInformacoesRodape();
    }

    // Cria botões de voltar e início automaticamente
    criarNavegacaoPadrao() {
        if(this.arquivoAtual !== this.config.paginaInicial) {
            const nav = document.createElement("div");
            nav.style.cssText = `
                position: fixed; bottom: 15px; left: 15px; right: 15px;
                display: flex; gap: 10px; z-index: 999;
            `;
            nav.innerHTML = `
                <a href="${this.config.paginaInicial}" style="
                    flex:1; padding:12px; background:#203560; color:#E0EFFF;
                    border-radius:10px; text-align:center; text-decoration:none;
                    font-weight:bold; font-size:14px;
                ">🏠 INÍCIO</a>
                <button onclick="history.back()" style="
                    flex:1; padding:12px; background:#00CCFF; color:#050B18;
                    border:none; border-radius:10px; font-weight:bold; font-size:14px;
                ">← VOLTAR</button>
            `;
            document.body.appendChild(nav);
            document.body.style.paddingBottom = "80px";
        }
    }

    // Verifica se todos os links cadastrados existem
    verificarLinks() {
        this.config.modulos.forEach(mod => {
            if(mod.arquivo === this.arquivoAtual) return;
            fetch(mod.arquivo, {method: "HEAD"})
                .then(res => {
                    if(!res.ok) console.warn(`⚠️ ANDRÔMEDA: Arquivo ${mod.arquivo} não encontrado!`);
                })
                .catch(() => console.warn(`⚠️ ANDRÔMEDA: Arquivo ${mod.arquivo} não encontrado!`));
        });
    }

    // Adiciona o rodapé padrão em todas as páginas
    exibirInformacoesRodape() {
        const rodape = document.querySelector(".rodape");
        if(rodape) {
            rodape.innerHTML = `
                ${this.config.nomeProjeto} © Versão ${this.config.versao}<br>
                Idealizado por ${this.config.autor} • Todos os direitos reservados
            `;
        }
    }
}
