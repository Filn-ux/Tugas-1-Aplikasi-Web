import { useEffect, useState } from "react";

function Header() {
  const [now, setNow] = useState(new Date());

  // Lifecycle: timer dibuat saat komponen mount, dibersihkan saat unmount
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="brand-icon">✚</div>
        <div>
          <h1>Apotek Sejahtera</h1>
          <p>Sistem Pengecekan Stok Obat</p>
        </div>
        <time className="header-clock">
          {now.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "medium" })}
        </time>
      </div>
    </header>
  );
}

export default Header;
