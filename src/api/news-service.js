/**
 * SERVIÇO DE NOTÍCIAS VIA PROXY
 * Este arquivo chama o Proxy seguro para buscar notícias do GNews/Google.
 */

// Esta URL será o endpoint do seu Proxy (que você configurará depois)
const PROXY_URL = "https://seu-proxy-no-vercel-ou-firebase.com/api/news";

export async function buscarNoticias() {
    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) throw new Error("Erro ao conectar com o Proxy");
        
        const data = await response.json();
        
        // Retornamos os artigos vindos do Proxy
        return data.articles; 
    } catch (error) {
        console.error("Falha na busca:", error);
        // Retorno padrão para o site não ficar em branco enquanto configura o Proxy
        return [{
            title: "Configurando Conexão Segura",
            description: "O sistema está aguardando a ativação do Proxy para carregar as notícias.",
            image: "https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg"
        }];
    }
}
