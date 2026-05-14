/**
 * SERVIÇO DE NOTÍCIAS - src/api/news-service.js
 */

export async function buscarNoticias() {
    const apiKey = localStorage.getItem('GNEWS_API_KEY');

    if (!apiKey) {
        console.warn("Chave não encontrada.");
        return [];
    }

    // Tentaremos a conexão direta. 
    // Se o navegador bloquear por CORS, usaremos o plano B.
    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=pt&country=br&max=10&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const erro = await response.json();
            console.error("Erro detalhado da API:", erro);
            return [];
        }

        const data = await response.json();
        return data.articles || [];
        
    } catch (error) {
        console.error("Erro de rede:", error);
        
        // Plano B: Se a conexão direta falhar, tentamos via proxy alternativo
        try {
            const proxySecundario = "https://api.allorigins.win/get?url=";
            const responseProxy = await fetch(proxySecundario + encodeURIComponent(url));
            const dataProxy = await responseProxy.json();
            const noticiasFinal = JSON.parse(dataProxy.contents);
            return noticiasFinal.articles || [];
        } catch (proxyError) {
            console.error("Proxy também falhou:", proxyError);
            return [];
        }
    }
}
