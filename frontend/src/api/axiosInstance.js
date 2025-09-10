import axios from 'axios';

// Membuat instance axios baru dengan konfigurasi default
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ambil base URL dari .env
});

// Menambahkan interceptor untuk request (otomatis mengirim token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika ada error pada request
    return Promise.reject(error);
  }
);

// Menambahkan interceptor untuk response (menangani error 401/Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    // Jika response sukses, langsung kembalikan
    return response;
  },
  (error) => {
    // Jika error adalah 401 (Unauthorized), artinya token tidak valid/habis
    if (error.response && error.response.status === 401) {
      // Hapus token yang tidak valid
      localStorage.removeItem('token');
      // Arahkan pengguna kembali ke halaman login
      window.location.href = '/signin';
    }
    // Kembalikan error agar bisa ditangani oleh blok .catch di komponen
    return Promise.reject(error);
  }
);

export default axiosInstance;