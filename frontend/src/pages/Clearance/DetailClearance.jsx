import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailItem from '../../components/ui/DetailItem';
import MuatanDetailTable from '../../components/clearance/MuatanDetailTable';
import Button from '../../components/ui/Button';

const sampleClearanceDetailData = {
    id: 1,
    jenisPkk: 'Dalam Negeri',
    noSpbAsal: '123/SPB-LMG/08-2025',
    noSpbKalianget: '456/SPB-KGT/08-2025',
    registerBulan: '08-2025',
    noUrut: 12,
    tanggalClearance: '2025-08-20',
    pukulClearance: '09:45',
    pukulKapalBerangkat: '14:00',
    kapal: {
        nama: 'KM. Sejahtera Abadi',
        jenis: 'General Cargo',
        bendera: 'Indonesia',
        gt: 2500,
        nt: 1500,
        nomorSelar: '123456',
        tandaSelar: 'IND-01',
        nomorImo: 'IMO12345',
        callSign: 'YB123',
    },
    nahkoda: { nama: 'Capt. Andi Wijaya', jumlahCrew: 12 },
    perjalanan: {
        kedudukanKapal: 'Kalianget',
        datangDari: 'Surabaya',
        tanggalDatang: '2025-08-19',
        tempatSinggah: 'Sapeken',
        tujuanAkhir: 'Pamekasan',
        agen: 'PT Laut Jaya',
        statusMuatan: 'Ada Muatan',
    },
    barangDatang: [
        { nama: 'BBM', satuan: 'Liter', jumlah: 20000 },
        { nama: 'Semen', satuan: 'Ton', jumlah: 10 },
    ],
    barangBerangkat: [
        { nama: 'Beras', satuan: 'Ton', jumlah: 15 },
        { nama: 'Pupuk', satuan: 'Kg', jumlah: 8000 },
    ]
};

const DetailClearance = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [activeMuatanTab, setActiveMuatanTab] = useState('datang');

    useEffect(() => {
        setData(sampleClearanceDetailData);
    }, [id]);

    if (!data) return <div className="p-6">Memuat data...</div>;

    return (
        <div className="space-y-6">
            <div>
                <Link to="/clearance" className="text-sm text-gray-500 hover:text-indigo-600 inline-flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Daftar Clearance
                </Link>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Detail SPB: {data.noSpbKalianget}</h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button>Edit Data</Button>
                        <button className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                            Hapus Clearance
                        </button>
                        <Button variant="secondary">Cetak SPB</Button>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Informasi Umum & Kapal</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Jenis PKK" value={data.jenisPkk} />
                    <DetailItem label="No SPB Asal" value={data.noSpbAsal} />
                    <DetailItem label="Tanggal Clearance" value={new Date(data.tanggalClearance).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} />
                    <DetailItem label="Pukul Clearance" value={data.pukulClearance} />
                </div>
                <div className="space-y-4 border-t pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <DetailItem label="Nama Kapal" value={data.kapal.nama} />
                        <DetailItem label="Nahkoda" value={data.nahkoda.nama} />
                        <DetailItem label="Jumlah Crew" value={data.nahkoda.jumlahCrew} />
                        <DetailItem label="Agen" value={data.perjalanan.agen} />
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Informasi Perjalanan</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Kedudukan Kapal" value={data.perjalanan.kedudukanKapal} />
                    <DetailItem label="Datang Dari" value={data.perjalanan.datangDari} />
                    <DetailItem label="Tanggal Datang" value={new Date(data.perjalanan.tanggalDatang).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} />
                    <DetailItem label="Pukul Kapal Berangkat" value={data.pukulKapalBerangkat} />
                    <DetailItem label="Tujuan Akhir" value={data.perjalanan.tujuanAkhir} />
                    <DetailItem label="Tempat Singgah" value={data.perjalanan.tempatSinggah} />
                    <DetailItem label="Status Muatan Berangkat" value={data.perjalanan.statusMuatan} />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex gap-x-6 px-4" aria-label="Tabs">
                        <button onClick={() => setActiveMuatanTab('datang')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeMuatanTab === 'datang' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            Barang Datang
                        </button>
                        <button onClick={() => setActiveMuatanTab('berangkat')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeMuatanTab === 'berangkat' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            Barang Berangkat
                        </button>
                    </nav>
                </div>
                <div>
                    {activeMuatanTab === 'datang' && <MuatanDetailTable data={data.barangDatang} />}
                    {activeMuatanTab === 'berangkat' && <MuatanDetailTable data={data.barangBerangkat} />}
                </div>
            </div>
        </div>
    );
};

export default DetailClearance;