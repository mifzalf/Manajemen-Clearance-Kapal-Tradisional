import React from 'react';

const PrintableSPB = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  const generatePPKNumber = () => {
    const jenisPPK = data.ppk;
    const noRegister = data.no_urut ;
    const bulan = new Date(data.tanggal_clearance).getMonth() + 1;
    const tahun = new Date(data.tanggal_clearance).getFullYear();
    return `PPK.${jenisPPK} ${noRegister} ${bulan} ${tahun}`;
  };

  const generateSPBNumber = () => {
    const nomorSPB = data.spb?.no_spb;
    const bulan = new Date(data.tanggal_clearance).getMonth() + 1;
    const tahun = new Date(data.tanggal_clearance).getFullYear();
    return `N.7 K.M.17 ${nomorSPB} ${bulan} ${tahun}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const formatLongDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCargoStatus = () => {
    if (data.muatans && data.muatans.length > 0) {
      return "SESUAI MANIFEST";
    }
    return "NIHIL";
  };

  return (
    <div ref={ref} className="p-8 font-serif text-black bg-white">
      <div className="w-[180mm] mx-auto">
        <header className="text-right mb-8">
          <p className="text-sm">{generatePPKNumber()}</p>
        </header>

        <main>
          <div className="flex justify-end mb-8">
            <div className="border-2 border-red-600 p-2 inline-block">
              <p className="text-sm font-bold text-red-600 text-center">
                <span className="underline">* PERINGATAN AWAL *</span><br/>
                UTAMAKAN KESELAMATAN BERLAYAR<br/>
                BERLAYAR BILA CUACA BURUK
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm font-bold">{generateSPBNumber()}</p>
          </div>

          <div className="flex justify-center">
            <div className="inline-block space-y-4 text-sm">
              {/* --- DATA BLOK 1 --- */}
              <div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{data.kapal?.nama_kapal}</span>
                  <span>GT.{data.kapal?.gt}</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{data.kapal?.bendera?.kode_negara}</span>
                  <span>{data.nahkoda?.nama_nahkoda}</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{data.kapal?.call_sign || '-'}</span>
                  <span>{data.kapal?.nomor_imo || '-'}</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{formatDate(data.tanggal_clearance)}</span>
                  <span>{data.pukul_agen_clearance}</span>
                </div>
              </div>

              <div className='h-5'></div>

              {/* --- DATA BLOK 2 --- */}
              <div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>KALIANGET</span>
                  <span>{data.tujuan_akhir?.nama_kecamatan}</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{data.jumlah_crew} ORANG</span>
                  <span>{formatDate(data.tanggal_berangkat)} {data.pukul_kapal_berangkat} LT</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>KALIANGET</span>
                  <span>{getCargoStatus()}</span>
                </div>
                <div className="grid grid-cols-[200px_1fr] gap-4">
                  <span>{formatLongDate(data.tanggal_berangkat)}</span>
                  <span></span>
                </div>
              </div>

            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
});

export default PrintableSPB;