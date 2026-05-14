/**
 * SERVIÇO DE NOTÍCIAS ESTÁVEL - src/api/news-service.js
 */

export async function buscarNoticias() {
    const apiKey = localStorage.getItem('GNEWS_API_KEY');

    if (!apiKey) {
        console.warn("Chave não configurada.");
        return [];
    }

    // URL da API do GNews
    const urlGNews = `https://gnews.io/api/v4/top-headlines?category=general&lang=pt&country=br&max=10&apikey=${apiKey}`;
    
    // Usando AllOrigins como ponte (Proxy) estável
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlGNews)}`;

    try {
        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error("Erro na rede");

        const dataWrapper = await response.json();
        
        // O AllOrigins coloca o resultado dentro de uma string chamada 'contents'
        const data = JSON.parse(dataWrapper.contents);
        
        if (data.articles) {
            console.log("Notícias carregadas com sucesso!");
            return data.articles;
        } else {
            console.error("Erro na estrutura da API:", data);
            return [];
        }
        
    } catch (error) {
        console.error("Falha geral na busca:", error);
        return [];
    }
}
