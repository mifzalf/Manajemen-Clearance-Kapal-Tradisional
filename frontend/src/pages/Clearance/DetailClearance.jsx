import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const dummyLetters = [
  { id: 1, agendaId: 'AGD-001', sender: 'PT. Sejahtera Abadi', letterNumber: '123/SA/VI/2024', letterDate: '2024-06-01', receivedDate: '2024-06-02', summary: 'Pengajuan clearance kapal tongkang', classification: 'Penting', remarks: 'Segera proses', file: 'sample.pdf' },
];

const DetailItem = ({ label, value }) => (
  <div className="break-words">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || '-'}</p>
  </div>
);

const DetailClearance = () => {
  const { id } = useParams();
  const letter = dummyLetters.find(l => l.id.toString() === id);
  const [numPages, setNumPages] = React.useState(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { if (containerRef.current) observer.unobserve(containerRef.current); };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!letter) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Data tidak ditemukan</h2>
        <Link to="/clearance" className="text-brand-500 hover:underline">Kembali ke daftar clearance</Link>
      </div>
    );
  }

  const fileUrl = `/files/${letter.file}`;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/clearance" className="text-sm text-gray-500 hover:text-brand-500">
            &larr; Kembali ke Clearance
          </Link>
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">Detail Clearance: {letter.letterNumber}</h1>
        </div>
        <a href={fileUrl} download className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600">
          Download File
        </a>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Detail</h3>
        <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="ID Agenda" value={letter.agendaId} />
          <DetailItem label="Nomor Surat" value={letter.letterNumber} />
          <DetailItem label="Pengirim" value={letter.sender} />
          <DetailItem label="Tanggal Surat" value={letter.letterDate} />
          <DetailItem label="Tanggal Diterima" value={letter.receivedDate} />
          <DetailItem label="Kode Klasifikasi" value={letter.classification} />
          <DetailItem label="Ringkasan Isi" value={letter.summary} />
          <DetailItem label="Keterangan Tambahan" value={letter.remarks} />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Pratinjau File</h3>
        <div ref={containerRef} className="h-[70vh] w-full overflow-y-auto rounded-lg border bg-slate-800 p-2 sm:p-4">
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} loading="Memuat PDF...">
            <div className="flex flex-col items-center">
              {Array.from(new Array(numPages || 0), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mb-4 shadow-lg"
                  width={containerWidth < 768 ? containerWidth * 0.95 : undefined}
                />
              ))}
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default DetailClearance;