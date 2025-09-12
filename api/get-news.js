// Import fetch if you are using a Node.js version older than 18
// For modern serverless environments (like Vercel), 'fetch' is available globally.

export default async function handler(req, res) {
    // La API Key se obtiene de una variable de entorno segura, no se escribe en el código.
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        // Envía un error 500 (Error Interno del Servidor) si la clave no está configurada.
        return res.status(500).json({ error: 'La API Key del servidor de noticias no está configurada.' });
    }

    // Construye la URL para obtener las noticias de negocios más importantes de EE. UU.
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=40&apiKey=${apiKey}`;

    try {
        // Realiza la llamada a NewsAPI desde el servidor.
        const newsResponse = await fetch(newsApiUrl);

        // Si NewsAPI responde con un error, lo pasamos al frontend.
        if (!newsResponse.ok) {
            const errorData = await newsResponse.json();
            console.error('Error from NewsAPI:', errorData);
            return res.status(newsResponse.status).json({ 
                error: `NewsAPI respondió con un error: ${errorData.message || newsResponse.statusText}` 
            });
        }
        
        // Si todo sale bien, obtiene los datos en formato JSON.
        const newsData = await newsResponse.json();

        // Envía una respuesta exitosa (código 200) con los artículos al frontend.
        res.status(200).json(newsData);

    } catch (error) {
        // Captura cualquier otro error (ej. problemas de red en el servidor).
        console.error('Error interno al contactar NewsAPI:', error);
        res.status(500).json({ error: 'Falló la conexión del servidor con el servicio de noticias.' });
    }
}
