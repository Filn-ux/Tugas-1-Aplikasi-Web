import { useState } from "react";

const initialForm = { name: "", category: "", stock: "", unit: "Strip" };

function AddMedicineForm({ onAdd, existingNames }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const category = form.category.trim();
    const stock = Number(form.stock);

    if (!name || !category || form.stock === "") {
      setError("Nama, kategori, dan jumlah stok harus diisi.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stok harus berupa bilangan bulat, minimal 0.");
      return;
    }
    if (existingNames.includes(name.toLowerCase())) {
      setError(`Obat "${name}" sudah ada di daftar.`);
      return;
    }

    onAdd({ name, category, stock, unit: form.unit });
    setForm(initialForm);
  };

  return (
    <section className="add-form">
      <div className="form-heading">
        <div>
          <h2>Tambah Obat</h2>
          <p>Masukkan informasi obat baru ke dalam stok.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Nama obat"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Kategori obat"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Jumlah stok"
          min="0"
          value={form.stock}
          onChange={handleChange}
        />
        <select name="unit" value={form.unit} onChange={handleChange}>
          <option value="Strip">Strip</option>
          <option value="Botol">Botol</option>
          <option value="Box">Box</option>
          <option value="Tablet">Tablet</option>
          <option value="Kapsul">Kapsul</option>
        </select>
        <button type="submit" className="add-button">
          + Tambah Obat
        </button>
      </form>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export default AddMedicineForm;
