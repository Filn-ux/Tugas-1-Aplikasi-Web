import { getStockStatus, getLowerUnitInfo, formatNumber } from "../utils/stock";

function MedicineCard({ medicine, onIncrease, onDecrease, onDelete }) {
  const status = getStockStatus(medicine.stock, medicine.unit);
  // Keterangan satuan di bawahnya (mis. 20 Box = 200 Strip)
  const lower = getLowerUnitInfo(medicine.stock, medicine.unit);

  const handleDelete = () => {
    if (window.confirm(`Hapus ${medicine.name} dari daftar?`)) {
      onDelete(medicine.id);
    }
  };

  return (
    <article className="medicine-card">
      <div className="medicine-main">
        <div className="medicine-title-row">
          <div className="medicine-icon">💊</div>
          <div>
            <h3>{medicine.name}</h3>
            <p>{medicine.category}</p>
          </div>
        </div>

        <div className="stock-row">
          <div>
            <span className="stock-label">Stok tersedia</span>
            <strong>
              {medicine.stock} <small>{medicine.unit}</small>
            </strong>
            {lower && (
              <span className="stock-label">
                = {formatNumber(lower.value)} {lower.unit}
              </span>
            )}
          </div>
          <span className={`status ${status.className}`}>{status.label}</span>
        </div>
      </div>

      <div className="actions">
        <button
          className="stock-button"
          onClick={() => onDecrease(medicine.id)}
          disabled={medicine.stock === 0}
          title="Kurangi stok"
        >
          −
        </button>
        <button
          className="stock-button"
          onClick={() => onIncrease(medicine.id)}
          title="Tambah stok"
        >
          +
        </button>
        <button className="delete-button" onClick={handleDelete} title="Hapus obat">
          Hapus
        </button>
      </div>
    </article>
  );
}

export default MedicineCard;
