/**
 * ORQUESTRADOR PRINCIPAL - src/app.js
 */

import { buscarNoticias } from './api/news-service.js';
import { criarCardNoticia } from './components/card-noticia.js';

async function inicializarSite() {
    const feed = document.getElementById('news-feed');
    
    // Cria o botão de configuração (engrenagem) se ele não existir
    if (!document.getElementById('config-btn')) {
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
                <p>Nenhuma notícia encontrada.</p>
                <p style="font-size:0.8rem; color:#666;">Clique na ⚙️ abaixo para inserir sua chave do GNews.</p>
            </div>`;
    }
}

function abrirConfiguracao() {
    const chave = prompt("Insira sua API Key do GNews (Privado e Seguro):");
    if (chave) {
        localStorage.setItem('GNEWS_API_KEY', chave);
        alert("Configuração salva! O site será atualizado.");
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', inicializarSite);

// Garante que o menu lateral não cause erro ao clicar
window.filterNews = (categoria) => {
    console.log("Filtro selecionado:", categoria);
};
