import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Step1DataKapal from '../../components/clearance/Step1DataKapal';
import Step2DataMuatan from '../../components/clearance/Step2DataMuatan';

// ... (data sample Anda bisa dihapus jika tidak dipakai lagi)

const initialState = {
    ppk: '', no_spb_asal: '', tanggal_clearance: '', pukul_agen_clearance: '',
    id_kapal: '', id_nahkoda: '', jumlah_crew: '',
    id_kedudukan_kapal: '', id_datang_dari: '', tanggal_datang: '', tanggal_berangkat: '', pukul_kapal_berangkat: '', id_tempat_singgah: '', id_tujuan_akhir: '', id_agen: '',
    status_muatan_berangkat: 'Kosong', barangDatang: [], barangBerangkat: [],
};

const FormClearance = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const formRef = useRef(null);

    const [nahkodaData, setNahkodaData] = useState([]);
    const [kapalData, setKapalData] = useState([]);
    const [kabupatenData, setKabupatenData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [agenData, setAgenData] = useState([]);
    const [kategoriMuatanData, setKategoriMuatanData] = useState([]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialState);
    
    // Config untuk semua request axios yang butuh otorisasi
    const authConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Menggunakan Promise.all untuk fetch data secara paralel
                const [
                    agenRes, kabupatenRes, kapalRes, 
                    kecamatanRes, nahkodaRes, kategoriMuatanRes
                ] = await Promise.all([
                    axios.get(`${API_URL}/agen`, authConfig),
                    axios.get(`${API_URL}/kabupaten`, authConfig),
                    axios.get(`${API_URL}/kapal`, authConfig),
                    axios.get(`${API_URL}/kecamatan`, authConfig),
                    axios.get(`${API_URL}/nahkoda`, authConfig),
                    axios.get(`${API_URL}/kategori-muatan`, authConfig)
                ]);

                // Proses dan set semua data
                setAgenData(agenRes.data.datas.map(d => ({ nama: d.nama_agen, id: d.id_agen })));
                setKabupatenData(kabupatenRes.data.datas.map(d => ({ nama: d.nama_kabupaten, id: d.id_kabupaten })));
                setKapalData(kapalRes.data.datas.map(d => ({ nama: d.nama_kapal, id: d.id_kapal })));
                setKecamatanData(kecamatanRes.data.datas.map(d => ({ nama: d.nama_kecamatan, id: d.id_kecamatan })));
                setNahkodaData(nahkodaRes.data.datas.map(d => ({ nama: d.nama_nahkoda, id: d.id_nahkoda })));
                setKategoriMuatanData(kategoriMuatanRes.data.datas.map(d => ({ nama: d.nama_kategori_muatan, id: d.id_kategori_muatan })));

                // Jika mode edit, fetch data clearance
                if (isEditMode) {
                    const clearanceRes = await axios.get(`${API_URL}/perjalanan/${id}`, authConfig);
                    const clearanceData = clearanceRes.data.data;
                    
                    // Pre-fill form dengan data yang ada
                    const dataToEdit = {
                        ...initialState,
                        ...clearanceData,
                        barangDatang: clearanceData.muatans?.filter(m => m.jenis_perjalanan === 'datang') || [],
                        barangBerangkat: clearanceData.muatans?.filter(m => m.jenis_perjalanan === 'berangkat') || [],
                    };
                    setFormData(dataToEdit);
                }

            } catch (error) {
                toast.error("Gagal memuat data master.");
                console.error("Fetch Data Error:", error);
            }
        };
        
        fetchAllData();
    }, [id, isEditMode, API_URL]);

<<<<<<< HEAD
=======
    useEffect(() => {
        if (isEditMode) {
            fetchClearance()
        }
        fetchAgen()
        fetchKabupaten()
        fetchKapal()
        fetchKecamatan()
        fetchNahkoda()
        fetchKategoriMuatan()
    }, [id, isEditMode]);


    const fetchClearance = async () => {
        let response = await axios.get(API_URL + `/perjalanan/${id}`, {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        setClearanceData(response?.data?.data)
        console.log(clearanceData)
    }

    const fetchKategoriMuatan = async () => {
        let response = await axios.get(API_URL + '/kategori-muatan', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_kategori_muatan,
                id: d.id_kategori_muatan
            }
        })
        setKategoriMuatanData(filteredDatas)
    }

    const fetchNahkoda = async () => {
        let response = await axios.get(API_URL + '/nahkoda', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_nahkoda,
                id: d.id_nahkoda
            }
        })
        setNahkodaData(filteredDatas)
    }

    const fetchKapal = async () => {
        let response = await axios.get(API_URL + '/kapal', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_kapal,
                id: d.id_kapal
            }
        })
        setKapalData(filteredDatas)
    }

    const fetchKabupaten = async () => {
        let response = await axios.get(API_URL + '/kabupaten', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_kabupaten,
                id: d.id_kabupaten
            }
        })
        setKabupatenData(filteredDatas)
    }

    const fetchKecamatan = async () => {
        let response = await axios.get(API_URL + '/kecamatan', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_kecamatan,
                id: d.id_kecamatan
            }
        })
        setKecamatanData(filteredDatas)
    }

    const fetchAgen = async () => {
        let response = await axios.get(API_URL + '/agen', {
            headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        })
        let filteredDatas = response.data.datas.map(d => {
            return {
                nama: d.nama_agen,
                id: d.id_agen
            }
        })
        setAgenData(filteredDatas)
    }
>>>>>>> 47500b33014dce8afb56a5634067d70e3b888dd7

    const handleKapalChange = (kapalId) => {
        const selectedKapal = kapalData.find(k => k.id === parseInt(kapalId));
        if (selectedKapal) {
            setFormData(prev => ({ ...prev, id_kapal: selectedKapal.id }));
        } else {
            setFormData(prev => ({ ...prev, id_kapal: '' }));
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formRef.current?.checkValidity()) {
            formRef.current?.reportValidity();
            return;
        }
        let { barangBerangkat, barangDatang, ...cleanData } = formData;
        let newData = {
            ...cleanData,
            muatan: [...formData.barangBerangkat, ...formData.barangDatang]
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            if (!localStorage.getItem('token')) {
                toast.error("Sesi Anda telah berakhir, silakan login kembali.");
                navigate('/signin');
                return;
            }

            const response = isEditMode
<<<<<<< HEAD
                ? await axios.patch(`${API_URL}/perjalanan/update/${id}`, newData, config)
                : await axios.post(`${API_URL}/perjalanan/store`, newData, config);

=======
                ? await axios.patch(`${API_URL}/perjalanan/update/${currentItem.id_perjalanan}`, newData, {
                    headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
                })
                : await axios.post(`${API_URL}/perjalanan/store`, newData, {
                    headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
                });
>>>>>>> 47500b33014dce8afb56a5634067d70e3b888dd7
            if (response.status === 200) {
                toast.success(`Data Clearance berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!`);
                if (isEditMode) {
                    navigate(`/clearance/${id}`);
                } else {
                    navigate('/clearance');
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan saat menyimpan data.";
            toast.error(errorMessage);
            console.error("Submit Error:", error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit' : 'Formulir'} Surat Persetujuan Berlayar</h1>
            <div className="w-full">
                <ol className="flex items-center w-full">
                    <li className={`flex w-full items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b ${step > 1 ? 'after:border-blue-600' : 'after:border-gray-200'} after:border-4 after:inline-block`}>
                        <span className={`flex items-center justify-center w-10 h-10 ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>1</span>
                    </li>
                    <li className={`flex items-center w-auto`}>
                        <span className={`flex items-center justify-center w-10 h-10 ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'} rounded-full lg:h-12 lg:w-12 shrink-0`}>2</span>
                    </li>
                </ol>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <form ref={formRef} onSubmit={handleSubmit}>
                    {step === 1 && (
                        <Step1DataKapal
                            formData={formData} setFormData={setFormData}
                            nextStep={nextStep} handleSubmit={handleSubmit}
                            handleKapalChange={handleKapalChange} kapalOptions={kapalData}
                            nahkodaOptions={nahkodaData} kabupatenOptions={kabupatenData}
                            kecamatanOptions={kecamatanData} agenOptions={agenData}
                            jenisPpkOptions={[{ id: '27', nama: '27' }, { id: '29', nama: '29' }]}
                        />
                    )}
                    {step === 2 && (
                        <Step2DataMuatan
                            formData={formData} setFormData={setFormData}
                            prevStep={prevStep} muatanOptions={kategoriMuatanData}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormClearance;