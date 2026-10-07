function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        placeholder="Cari nama obat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button className="clear-search" onClick={() => setSearch("")}>
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
