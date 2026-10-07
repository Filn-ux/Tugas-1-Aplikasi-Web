import { useEffect, useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import MedicineList from "./components/MedicineList";
import AddMedicineForm from "./components/AddMedicineForm";
import { getStockStatus, toBox, isConvertible } from "./utils/stock";
import "./App.css";

const STORAGE_KEY = "medicines";

const defaultMedicines = [
  { id: 1, name: "Paracetamol", category: "Analgesik", stock: 50, unit: "Strip" },
  { id: 2, name: "Amoxicillin", category: "Antibiotik", stock: 10, unit: "Strip" },
  { id: 3, name: "Vitamin C", category: "Vitamin", stock: 0, unit: "Botol" },
  { id: 4, name: "Antasida", category: "Obat Lambung", stock: 25, unit: "Strip" }
];

// Aman terhadap data localStorage yang rusak / format salah
function loadMedicines() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : defaultMedicines;
  } catch {
    return defaultMedicines;
  }
}

function App() {
  const [medicines, setMedicines] = useState(loadMedicines);
  const [search, setSearch] = useState("");

  // Efek samping 1: sinkronisasi data ke localStorage setiap medicines berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
  }, [medicines]);

  const countByStatus = (label) =>
    medicines.filter((m) => getStockStatus(m.stock, m.unit).label === label).length;

  const safeCount = countByStatus("Aman");
  const lowCount = countByStatus("Menipis");
  const emptyCount = countByStatus("Habis");
  // Total stok dihitung dalam Box (mis. 5 Strip + 5 Box = 5,5 Box), botol terpisah
  const totalStock = medicines.reduce(
    (total, m) => total + (toBox(m.stock, m.unit) ?? 0),
    0
  );
  const totalBottles = medicines
    .filter((m) => !isConvertible(m.unit))
    .reduce((total, m) => total + m.stock, 0);

  // Efek samping 2: judul tab browser ikut menampilkan jumlah stok yang perlu perhatian
  useEffect(() => {
    const alertCount = lowCount + emptyCount;
    document.title =
      alertCount > 0 ? `(${alertCount}) ApotekKu - Cek Stok Obat` : "ApotekKu - Cek Stok Obat";
  }, [lowCount, emptyCount]);

  const addMedicine = (newMedicine) => {
    setMedicines((prev) => [...prev, { ...newMedicine, id: Date.now() }]);
  };

  const changeStock = (id, delta) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, stock: Math.max(0, m.stock + delta) } : m
      )
    );
  };

  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const keyword = search.trim().toLowerCase();
  const filteredMedicines = medicines.filter((m) =>
    m.name.toLowerCase().includes(keyword)
  );

  return (
    <div className="app">
      <Header />

      <main className="container">
        <Dashboard
          totalTypes={medicines.length}
          totalStock={totalStock}
          totalBottles={totalBottles}
          lowCount={lowCount}
          emptyCount={emptyCount}
        />

        <AddMedicineForm
          onAdd={addMedicine}
          existingNames={medicines.map((m) => m.name.toLowerCase())}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <div className="section-heading">
          <div>
            <h2>Daftar Obat</h2>
            <p>
              {filteredMedicines.length} obat ditampilkan · {safeCount} stok aman
            </p>
          </div>
        </div>

        <MedicineList
          medicines={filteredMedicines}
          isSearching={keyword !== ""}
          onIncrease={(id) => changeStock(id, 1)}
          onDecrease={(id) => changeStock(id, -1)}
          onDelete={deleteMedicine}
        />
      </main>
    </div>
  );
}

export default App;
