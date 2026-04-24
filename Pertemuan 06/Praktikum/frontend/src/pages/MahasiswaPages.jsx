import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    getMahasiswa()
      .then(setMahasiswa)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // pertama kali load
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data mahasiswa berdasarkan search keyword
  const filteredMahasiswa = mahasiswa.filter((mhs) => {
    const keyword = search.toLowerCase();
    return (
      String(mhs.nama || "").toLowerCase().includes(keyword) ||
      String(mhs.npm || "").toLowerCase().includes(keyword) ||
      String(mhs.email || "").toLowerCase().includes(keyword) ||
      String(mhs.alamat || "").toLowerCase().includes(keyword) ||
      String(mhs.prodi || "").toLowerCase().includes(keyword)
    );
  });

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  if (error) return (
    <div className="max-w-5xl mx-auto p-6 text-center mt-8">
      <p className="text-red-500 mb-4">Error: {error}</p>
      <button onClick={fetchData} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
        Coba Lagi / Refresh
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Daftar Mahasiswa</h2>

      <div className="mb-6">
        <div className="flex items-center text-blue-500 font-medium mb-4 text-sm">
          Total Mahasiswa 
          <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2 rounded-md font-bold text-xs">
            {filteredMahasiswa.length}
          </span>
        </div>
        
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Cari mahasiswa..."
            className="border border-gray-200 p-2 rounded flex-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">NO</th>
              <th className="px-6 py-4">NPM</th>
              <th className="px-6 py-4">NAMA / PRODI</th>
              <th className="px-6 py-4">EMAIL</th>
              <th className="px-6 py-4">ALAMAT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMahasiswa.map((mhs, index) => (
              <tr key={mhs.npm || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{mhs.npm}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-800">{mhs.nama}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{mhs.prodi}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{mhs.email}</td>
                <td className="px-6 py-4 text-gray-600">{mhs.alamat}</td>
              </tr>
            ))}
            {filteredMahasiswa.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Data mahasiswa tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}