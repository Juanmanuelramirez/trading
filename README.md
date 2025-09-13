# **Radar de Inversiones con IA 📈**

Un asistente de trading avanzado que utiliza Inteligencia Artificial para analizar noticias del mercado en tiempo real y identificar las mejores oportunidades de inversión. Este proyecto integra análisis de sentimiento, análisis técnico y generación de reportes con IA para ofrecer una visión completa del mercado.

## **✨ Características Principales**

* **Análisis de Noticias en Tiempo Real**: Se conecta a fuentes de noticias para obtener los titulares de negocios más recientes.  
* **IA para Análisis de Mercado**: Utiliza la API de Gemini para analizar decenas de noticias simultáneamente, identificando activos, sentimiento y potencial de rendimiento.  
* **Ranking de Oportunidades**: Presenta un Top 10 de las mejores oportunidades de inversión basadas en el análisis de la IA.  
* **Análisis Técnico Integrado**: La estructura está preparada para incorporar análisis técnico (como retrocesos de Fibonacci) a partir de datos históricos de acciones.  
* **Generación de Tesis de Inversión**: Con un solo clic, la IA de Gemini redacta una tesis de inversión detallada y profesional para cualquier activo de la lista.  
* **Arquitectura Segura y Moderna**: Utiliza un backend serverless (funciones sin servidor) para proteger las claves de API y gestionar las llamadas a servicios externos de forma segura.

## **🚀 Stack Tecnológico**

* **Frontend**: HTML5, Tailwind CSS, JavaScript (Vanilla JS)  
* **Backend**: Funciones Serverless (Node.js) desplegadas en Vercel/Netlify.  
* **APIs Externas**:  
  * **Google Gemini**: Para el análisis de noticias y la generación de tesis de inversión.  
  * **NewsAPI**: Para obtener titulares de noticias de negocios en tiempo real.  
  * **Alpha Vantage**: Para obtener datos históricos de precios de acciones.

## **📂 Estructura del Proyecto**

El proyecto está organizado con una arquitectura desacoplada, separando el cliente de la lógica del servidor.

/  
├── api/  
│   ├── generate-thesis.js   \# Backend: Se conecta a Gemini para la tesis.  
│   ├── get-stock-data.js    \# Backend: Se conecta a Alpha Vantage para datos de mercado.  
│   └── get-news.js          \# Backend: Se conecta a NewsAPI para las noticias.  
│  
└── index.html               \# Frontend: La interfaz de usuario que ve el cliente.

## **🛠️ Configuración y Despliegue**

Para desplegar tu propia instancia de esta aplicación, sigue estos pasos:

### **1\. Requisitos Previos**

* Una cuenta de **GitHub**.  
* Una cuenta de **Vercel** (puedes registrarte con tu cuenta de GitHub).  
* Claves de API para los siguientes servicios:  
  * [Google Gemini API](https://aistudio.google.com/)  
  * [NewsAPI](https://newsapi.org/)  
  * [Alpha Vantage](https://www.google.com/search?q=https://www.alphavantage.co/support/%23api-key)

### **2\. Fork y Clona el Repositorio**

Haz un "Fork" de este repositorio a tu propia cuenta de GitHub y luego clónalo en tu máquina local.

### **3\. Despliegue en Vercel**

1. **Importa el Proyecto**: En tu dashboard de Vercel, haz clic en "Add New... \-\> Project" e importa el repositorio que acabas de clonar desde GitHub.  
2. **Configuración del Build**: Vercel detectará automáticamente que es un proyecto estático con funciones serverless en la carpeta api. No necesitas cambiar ninguna configuración de build.  
3. **Configura las Variables de Entorno**: Este es el paso más importante para que la aplicación funcione. Ve a la configuración de tu proyecto en Vercel (Settings \-\> Environment Variables) y añade las siguientes claves:  
   * GEMINI\_API\_KEY: Tu clave de la API de Google Gemini.  
   * NEWS\_API\_KEY: Tu clave de la API de NewsAPI.  
   * ALPHA\_VANTAGE\_API\_KEY: Tu clave de la API de Alpha Vantage.  
4. **Despliega**: Haz clic en el botón "Deploy". Vercel construirá y desplegará tu aplicación. ¡Una vez terminado, tu Radar de Inversiones estará en línea\!

## **⚖️ Descargo de Responsabilidad**

Esta aplicación es una herramienta de demostración con fines educativos y no debe ser considerada como un asesoramiento financiero. Las decisiones de inversión deben tomarse con la debida investigación y consultando a un profesional financiero. Los datos de precios de acciones y las respuestas de la IA pueden contener imprecisiones.
