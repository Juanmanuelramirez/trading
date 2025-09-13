export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
        return res.status(500).json({ error: 'La clave de API para Gemini no está configurada en el servidor.' });
    }

    try {
        const { ticker, companyName, sentimentScore, technicalScore } = req.body;

        if (!ticker || !companyName || sentimentScore === undefined || technicalScore === undefined) {
            return res.status(400).json({ error: 'Faltan datos para generar la tesis.' });
        }

        const prompt = `
            Actúa como un analista de inversiones senior para un fondo de cobertura.
            Tu tarea es redactar una tesis de inversión concisa y persuasiva de un solo párrafo (máximo 4-5 frases) para la acción ${ticker} (${companyName}).

            Aquí está el contexto de nuestro análisis cuantitativo:
            - Puntaje de Sentimiento (basado en noticias): ${sentimentScore} (un puntaje alto como +15 es muy positivo).
            - Puntaje Técnico (basado en Fibonacci a 1 semana): ${technicalScore} (un puntaje alto como 20 indica que el precio está en una zona de soporte técnico fuerte).

            Basado en esta información y tu conocimiento general del mercado sobre ${companyName}, elabora la tesis.
            - Comienza con una declaración fuerte sobre la oportunidad.
            - Integra la idea de que hay un catalizador positivo reciente (sentimiento de noticias).
            - Menciona que el precio se encuentra en una posición técnicamente atractiva.
            - Concluye con una breve mención de la perspectiva o el riesgo principal a vigilar.
            - Escribe en un tono profesional y directo. No uses saludos ni despedidas, solo el párrafo de la tesis.
        `;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 250,
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error desde la API de Gemini:', errorBody);
            throw new Error(`La API de Gemini respondió con el estado: ${response.status}`);
        }

        const data = await response.json();
        const thesis = data.candidates[0]?.content?.parts[0]?.text || "La IA no pudo generar una respuesta.";

        res.status(200).json({ thesis });

    } catch (error) {
        console.error('Error interno al generar la tesis:', error);
        res.status(500).json({ error: 'Falló la conexión del servidor con el servicio de IA.' });
    }
}
