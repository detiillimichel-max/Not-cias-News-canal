/**
 * ORQUESTRADOR PRINCIPAL - src/app.js
 * Configurado para mostrar a engrenagem APENAS para o administrador.
 */

import { buscarNoticias } from './api/news-service.js';
import { criarCardNoticia } from './components/card-noticia.js';

async function inicializarSite() {
    const feed = document.getElementById('news-feed');
    
    // VERIFICAÇÃO DE SEGURANÇA:
    // O ícone só é criado se a URL contiver '?admin=true'
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';

    if (isAdmin && !document.getElementById('config-btn')) {
        const configBtn = document.createElement('button');
        configBtn.id = 'config-btn';
        configBtn.innerHTML = '⚙️';
        configBtn.style = "position:fixed; bottom:20px; left:20px; z-index:1000; background:#fff; border-radius:50%; border:1px solid #ddd; padding:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); font-size:20px; cursor:pointer;";
        configBtn.onclick = abrirConfiguracao;
        document.body.appendChild(configBtn);
    }

    const noticias = await buscarNoticias();
    
    if (noticias.length > 0) {
        feed.innerHTML = ""; 
        noticias.forEach(noticia => {
            const cardHTML = criarCardNoticia(noticia);
            feed.insertAdjacentHTML('beforeend', cardHTML);
        });
    } else {
        feed.innerHTML = `
            <div class="glass-panel" style="margin:20px; padding:30px; text-align:center; border-radius:20px;">
                <p>OIO News Vision</p>
                <p style="font-size:0.8rem; color:#666;">Aguardando conexão com a fonte de notícias.</p>
            </div>`;
    }
}

function abrirConfiguracao() {
    const chave = prompt("Acesso Restrito: Insira sua API Key do GNews:");
    if (chave) {
        localStorage.setItem('GNEWS_API_KEY', chave);
        alert("Chave configurada com sucesso!");
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', inicializarSite);

window.filterNews = (categoria) => {
    console.log("Filtro:", categoria);
};
