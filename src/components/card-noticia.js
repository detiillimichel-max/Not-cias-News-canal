export function criarCardNoticia(noticia) {
    return `
        <div class="news-card glass-panel">
            <img src="${noticia.image}" alt="${noticia.title}" style="width:100%; height:150px; object-fit:cover;">
            <div style="padding: 15px;">
                <h3 style="font-size: 1rem; margin: 0;">${noticia.title}</h3>
                <p style="font-size: 0.8rem; opacity: 0.8;">${noticia.description.substring(0, 100)}...</p>
                
                <input type="text" 
                       class="visiusuario-input" 
                       placeholder="Sua visão (máx. 30 caracteres)..." 
                       maxlength="30">
            </div>
        </div>
    `;
}

