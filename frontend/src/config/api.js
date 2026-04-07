// Replace this string with your actual Render backend URL once deployed, for example: 'https://my-resume-backend.onrender.com/api'
const RENDER_BACKEND_URL = ''; 

const API_URL = import.meta.env.VITE_API_URL 
    || RENDER_BACKEND_URL 
    || '/api';

export default API_URL;
