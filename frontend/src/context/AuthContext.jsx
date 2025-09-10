import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import axiosInstance from '../api/axiosInstance'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    const response = await axiosInstance.get(`/users/${userId}`);
                    setUser(response.data.data);
                } catch (error) {
                    console.error("Gagal mengambil data user atau token tidak valid:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};