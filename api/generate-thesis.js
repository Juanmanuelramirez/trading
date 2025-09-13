export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // --- SIMULACIÓN DE IA ---
    // Esta función simula la respuesta de la API de Gemini para evitar errores de conexión
    // en entornos de desarrollo o cuando la clave de API no está configurada.
    console.log("Simulando la generación de tesis de inversión...");

    try {
        const { ticker, companyName, sentimentScore, technicalScore } = req.body;

        if (!ticker || !companyName || sentimentScore === undefined || technicalScore === undefined) {
            return res.status(400).json({ error: 'Faltan datos para generar la tesis.' });
        }
        
        // Simulación de una respuesta de IA coherente basada en los datos recibidos
        const simulatedThesis = `
La tesis de inversión para ${ticker} (${companyName}) se apoya en una confluencia de factores positivos. 
El sentimiento del mercado, reflejado en un robusto puntaje de ${sentimentScore}, sugiere un catalizador de noticias reciente que está impulsando el interés de los inversores. 
Técnicamente, la acción se encuentra en una posición atractiva con un puntaje de ${technicalScore}, lo que indica que el precio actual está cerca de un nivel de soporte clave, presentando un punto de entrada de bajo riesgo relativo. 
La combinación de un impulso fundamental positivo y una estructura técnica favorable posiciona a ${ticker} como una oportunidad de inversión convincente a corto plazo, aunque se recomienda vigilar la volatilidad del mercado general como principal riesgo.
        `.trim().replace(/\s+/g, ' ');

        // Simular un retraso de red para que la experiencia sea más realista
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.status(200).json({ thesis: simulatedThesis });

    } catch (error) {
        console.error('Error en la simulación de la tesis:', error);
        res.status(500).json({ error: 'Falló la simulación del servicio de IA.' });
    }
}
