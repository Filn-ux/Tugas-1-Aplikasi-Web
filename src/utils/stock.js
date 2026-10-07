// Konversi satuan ke satuan dasar (tablet/kapsul):
//   1 strip = 10 tablet,  1 box = 10 strip = 100 tablet
// Botol tidak bisa dikonversi ke tablet, jadi dihitung terpisah.
export const UNIT_FACTOR = {
  Tablet: 1,
  Kapsul: 1,
  Strip: 10,
  Box: 100
};

// Batas "menipis": 200 tablet (= 20 strip = 2 box)
export const LOW_STOCK_LIMIT_BASE = 200;
// Botol berdiri sendiri, batasnya dalam botol
export const LOW_STOCK_LIMIT_BOTTLE = 20;

export const isConvertible = (unit) => unit in UNIT_FACTOR;

// Stok dalam satuan dasar (tablet). Botol -> null
export function toBaseUnit(stock, unit) {
  return isConvertible(unit) ? stock * UNIT_FACTOR[unit] : null;
}

export function getStockStatus(stock, unit) {
  if (stock === 0) return { label: "Habis", className: "empty-stock" };

  const limitReached = isConvertible(unit)
    ? toBaseUnit(stock, unit) <= LOW_STOCK_LIMIT_BASE
    : stock <= LOW_STOCK_LIMIT_BOTTLE;

  return limitReached
    ? { label: "Menipis", className: "low" }
    : { label: "Aman", className: "safe" };
}

// Stok dalam satuan Box (mis. 5 Strip + 5 Box = 0,5 + 5 = 5,5 Box). Botol -> null
export function toBox(stock, unit) {
  const base = toBaseUnit(stock, unit);
  return base === null ? null : base / UNIT_FACTOR.Box;
}

// Satuan satu tingkat di bawahnya, untuk keterangan di kartu: 20 Box = 200 Strip
const LOWER_UNIT = { Box: "Strip", Strip: "Tablet" };

export function getLowerUnitInfo(stock, unit) {
  const lower = LOWER_UNIT[unit];
  if (!lower) return null;
  return { value: (stock * UNIT_FACTOR[unit]) / UNIT_FACTOR[lower], unit: lower };
}

// Format angka gaya Indonesia: 5.5 -> "5,5"
export const formatNumber = (n) =>
  n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
