import StatCard from "./StatCard";
import { formatNumber } from "../utils/stock";

function Dashboard({ totalTypes, totalStock, totalBottles, lowCount, emptyCount }) {
  return (
    <section className="dashboard">
      <StatCard label="Total Jenis Obat" value={totalTypes} />
      <StatCard
        label="Total Stok (Box)"
        value={formatNumber(totalStock)}
        note={totalBottles > 0 ? `+ ${totalBottles} botol` : ""}
      />
      <StatCard label="Stok Menipis" value={lowCount} variant="warning" />
      <StatCard label="Stok Habis" value={emptyCount} variant="danger" />
    </section>
  );
}

export default Dashboard;
