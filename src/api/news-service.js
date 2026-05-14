/**
 * SERVIÇO DE NOTÍCIAS SEGURO - src/api/news-service.js
 * Este arquivo busca a chave do localStorage para garantir que nada seja exposto no GitHub.
 */

export async function buscarNoticias() {
    // Recupera a chave salva localmente no seu navegador via ícone de engrenagem
    const apiKey = localStorage.getItem('GNEWS_API_KEY');

    if (!apiKey) {
        console.warn("Chave da API não encontrada. Clique na engrenagem para configurar.");
        return [];
    }

    // Proxy para evitar erro de CORS no GitHub Pages
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const urlBase = `https://gnews.io/api/v4/top-headlines?category=general&lang=pt&country=br&max=10&apikey=${apiKey}`;

    try {
        // Tentativa de busca segura
        const response = await fetch(proxy + urlBase);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.articles) {
            return data.articles;
        } else {
            console.error("A API retornou um erro:", data.errors);
            return [];
        }
    } catch (error) {
        console.error("Erro de conexão ou Proxy:", error);
        return [];
    }
}
