import { buscarNoticias } from './api/news-service.js';
import { criarCardNoticia } from './components/card-noticia.js';

async function inicializarSite() {
    const feed = document.getElementById('news-feed');
    
    // 1. Busca as notícias através do Proxy
    const noticias = await buscarNoticias();
    
    // 2. Limpa o feed (caso haja algum carregando)
    feed.innerHTML = '';
    
    // 3. Renderiza cada notícia usando o seu componente
    noticias.forEach(noticia => {
        const cardHTML = criarCardNoticia(noticia);
        feed.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Inicia o processo quando o site carregar
document.addEventListener('DOMContentLoaded', inicializarSite);

// Função global para o seu menu (evita erro de 'undefined')
window.filterNews = function(categoria) {
    console.log("Filtrando por:", categoria);
    // Lógica de filtro será aplicada aqui depois
};

