import { buscarNoticias } from './api/news-service.js';
import { criarCardNoticia } from './components/card-noticia.js';

async function inicializarSite() {
    const feed = document.getElementById('news-feed');
    
    // VERIFICAÇÃO PARA APARECER A ENGRENAGEM:
    // Digite ?admin=true no final da URL do seu site para ela aparecer
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
                <p style="font-weight: bold;">Vision-News-Portal</p>
                <p style="font-size:0.8rem; color:#666;">Aguardando ativação da fonte de dados.</p>
                <p style="font-size:0.7rem; color:#999; margin-top:10px;">(Acesse via link admin para configurar)</p>
            </div>`;
    }
}

function abrirConfiguracao() {
    const chave = prompt("Configuração Privada: Insira sua API Key do GNews:");
    if (chave) {
        localStorage.setItem('GNEWS_API_KEY', chave);
        alert("Chave salva! O site será atualizado.");
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', inicializarSite);

window.filterNews = (categoria) => {
    console.log("Categoria:", categoria);
};
