// Configuración de API
// En producción, Vercel debe inyectar VITE_API_URL durante el build
const API_URL = import.meta.env.VITE_API_URL || 'https://levelup-gamer-react-api.onrender.com';

// Debug: verificar qué valor se está usando
console.log('🔧 API_URL configurada:', API_URL);
console.log('🔧 VITE_API_URL env:', import.meta.env.VITE_API_URL);

export default API_URL;
