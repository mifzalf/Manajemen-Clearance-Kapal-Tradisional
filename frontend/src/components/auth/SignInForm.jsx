import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import InputField from "../form/InputField";
import Button from "../ui/Button";

export default function SignInForm() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                username: formData.username,
                password: formData.password
            });

            localStorage.setItem('token', response.data.token);
            
            toast.success('Login berhasil! Mengarahkan ke dashboard...');
            
            navigate('/');

        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan. Coba lagi.";
            toast.error(errorMessage);
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
            <div className="mx-auto mb-5 w-full max-w-md pt-10 sm:pt-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    Kembali ke Dashboard
                </Link>
            </div>
            <div className="mx-auto flex flex-1 w-full max-w-md flex-col justify-center">
                <div>
                    <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-semibold text-gray-800 sm:text-3xl">
                            Sign In
                        </h1>
                        <p className="text-sm text-gray-500">
                            Masukkan username dan password Anda untuk masuk!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <InputField 
                                    id="username" 
                                    name="username" 
                                    type="text" 
                                    placeholder="Masukkan username Anda" 
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <InputField
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Masukkan password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-5 w-5 fill-gray-500" />
                                        ) : (
                                            <EyeCloseIcon className="h-5 w-5 fill-gray-500" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <Link
                                    to="#"
                                    className="text-sm text-brand-500 hover:text-brand-600"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                            <div>
                                <Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? 'Memproses...' : 'Sign In'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}