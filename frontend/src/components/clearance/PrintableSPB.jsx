import React from 'react';

const PrintableSPB = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  return (
    <div ref={ref} className="p-8 font-serif text-black">
      <div className="w-[180mm] mx-auto">
        <header className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm">KEMENTERIAN PERHUBUNGAN</p>
            <p className="text-sm font-bold border-b-2 border-black">DIREKTORAT JENDERAL PERHUBUNGAN LAUT</p>
            <p className="text-sm">KANTOR UNIT PENYELENGGARA KELAS III</p>
            <p className="text-sm font-bold">KALIANGGET</p>
          </div>
          <div className="text-right">
            <p className="text-sm">PKK. 70 &nbsp;&nbsp;&nbsp; {data.noUrut || '0037'} &nbsp;&nbsp;&nbsp; {data.registerBulan || '08-2025'}</p>
          </div>
        </header>

        <main>
          <div className="border-2 border-red-600 p-2 text-center my-4">
            <p className="text-sm font-bold text-red-600">
              "PERTIMBANGAN CUACA DIUTAMAKAN DEMI KESELAMATAN PELAYARAN, PELAYARAN DITUNDA BILA CUACA BURUK"
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-8">
            <div className="space-y-4">
              <div className="flex"><p className="w-48">N.V / K.M / L.S / M.V</p><p>: {data.kapal.nama}</p></div>
              <div className="flex"><p className="w-48">BENDERA</p><p>: {data.kapal.bendera}</p></div>
              <div className="flex"><p className="w-48">CALL SIGN</p><p>: {data.kapal.callSign}</p></div>
              <div className="flex"><p className="w-48">PELABUHAN TUJUAN</p><p>: {data.perjalanan.tujuanAkhir}</p></div>
              <div className="flex"><p className="w-48">TANGGAL TIBA</p><p>: {new Date(data.perjalanan.tanggalDatang).toLocaleDateString('id-ID')}</p></div>
              <div className="flex"><p className="w-48">TEMPAT SINGGAH</p><p>: {data.perjalanan.tempatSinggah}</p></div>
              <div className="flex"><p className="w-48">TANGGAL BERANGKAT</p><p>: {new Date(data.tanggalClearance).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p></div>
            </div>
            <div className="space-y-4">
              <div className="flex"><p className="w-48">GT.</p><p>: {data.kapal.gt}</p></div>
              <div className="flex"><p className="w-48">JAM KEBERANGKATAN</p><p>: {data.pukulKapalBerangkat}</p></div>
              <div className="flex"><p className="w-48">NAHKODA</p><p>: {data.nahkoda.nama}</p></div>
              <div className="flex"><p className="w-48">SELAKU PEMRAKARSA</p><p>: {data.perjalanan.agen}</p></div>
            </div>
          </div>
        </main>

        <footer className="mt-24">
          <div className="flex justify-end">
            <div className="text-center">
              <p>Kaliangget, {new Date(data.tanggalClearance).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
              <p className="font-bold">An. KEPALA KANTOR UPP KELAS III KALIANGGET</p>
              <p className="font-bold">Syahbandar</p>
              <div className="h-24"></div>
              <p className="font-bold underline">NAMA PEJABAT</p>
              <p>NIP. XXXXXXXXXXXXXXXXX</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});

export default PrintableSPB;