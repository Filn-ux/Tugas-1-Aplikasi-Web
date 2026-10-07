import MedicineCard from "./MedicineCard";

function MedicineList({ medicines, isSearching, onIncrease, onDecrease, onDelete }) {
  if (medicines.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">⌕</div>
        <h3>{isSearching ? "Obat tidak ditemukan" : "Belum ada data obat"}</h3>
        <p>
          {isSearching
            ? "Coba gunakan kata pencarian yang berbeda."
            : "Tambahkan obat pertama melalui form di atas."}
        </p>
      </div>
    );
  }

  return (
    <div className="medicine-list">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MedicineList;
