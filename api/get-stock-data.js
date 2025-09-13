export default async function handler(req, res) {
    // Obtiene la clave de API de una variable de entorno segura.
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    
    // Obtiene el ticker de la acción de los parámetros de la URL.
    const { ticker } = req.query;

    if (!apiKey) {
        return res.status(500).json({ error: 'La clave de API para Alpha Vantage no está configurada en el servidor.' });
    }
    
    if (!ticker) {
        return res.status(400).json({ error: 'El parámetro "ticker" es requerido.' });
    }

    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`;

    try {
        const marketDataResponse = await fetch(apiUrl);

        if (!marketDataResponse.ok) {
            // Si Alpha Vantage devuelve un error, lo registramos y lo notificamos.
            console.error('Error from Alpha Vantage API:', await marketDataResponse.text());
            return res.status(marketDataResponse.status).json({ error: 'El proveedor de datos de mercado respondió con un error.' });
        }
        
        const marketData = await marketDataResponse.json();

        // Alpha Vantage puede devolver una nota de error en una respuesta 200 OK si la API key es inválida o se superó el límite
        if (marketData["Note"] || marketData["Error Message"]) {
             console.error('API Note/Error from Alpha Vantage:', marketData);
             return res.status(429).json({ error: 'Límite de API de datos de mercado alcanzado o clave inválida.' });
        }

        res.status(200).json(marketData);

    } catch (error) {
        console.error('Error interno al contactar a Alpha Vantage:', error);
        res.status(500).json({ error: 'Falló la conexión del servidor con el servicio de datos de mercado.' });
    }
}
