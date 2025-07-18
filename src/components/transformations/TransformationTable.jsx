import React, { useState } from 'react';

const initialColumns = [
  { key: 'filename', label: 'FileName' },
  { key: 'datetime', label: 'Date/Time' },
  { key: 'source', label: 'Data source single URL' },
  { key: 'title', label: 'Application Title' },
  { key: 'description', label: 'Description' },
];

// Generate 25 sample records for pagination demo
const initialData = Array.from({ length: 25 }, (_, i) => ({
  filename: `text${i + 1}.txt`,
  datetime: `10/15/2023, 12:43:${(13 + i).toString().padStart(2, '0')} PM`,
  source: i % 2 === 0 ? 'https://www.tella.tv/' : 'https://gumroad.com/',
  title: i % 2 === 0
    ? 'Tella - Start recording better videos, fast. Tella - Record incredible videos, Tella 8DU Record incredible videos'
    : 'Fitness & Health, Design, Writing & Publishing, Gaming, Audio, Self Improvement, ...',
  description: i % 2 === 0
    ? 'Screen recording for creators — simple and powerful. Tella is your all-in-one screen recorder. ...'
    : 'Short stories, novels, and epic tomes full of interesting characters and worlds. ...',
}));

const PAGE_SIZE = 10;

const TransformationTable = () => {
  const [columns] = useState(initialColumns);
  const [data] = useState(initialData);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, direction: null });

  const filteredData = data.filter(row =>
    columns.every(col =>
      !filters[col.key] ||
      row[col.key]?.toLowerCase().includes(filters[col.key].toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    if (!sort.key || !sort.direction) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sort.key] || '';
      const bVal = b[sort.key] || '';
      if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sort]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const paginatedData = sortedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key) => {
    setSort(prev => {
      if (prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      if (prev.direction === 'desc') return { key: null, direction: null };
      return { key, direction: 'asc' };
    });
    setPage(1);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl shadow-lg border p-1 pt-0 pb-0 ove">
      {/* File Upload Button */}
      <div className="sticky top-0 z-20 p-2 sm:p-2 border-b bg-transparent">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <button className="bg-[#4AA181] text-white px-3 py-0 sm:px-4 sm:py-2 rounded font-semibold whitespace-nowrap w-full sm:w-auto text-sm sm:text-base">
            Choose File, Text, or Website
            <span className="block text-xs font-normal mt-1">Max file size 2 Mb</span>
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="bg-[#e6f4ef] text-[#4AA181] border border-[#4AA181] rounded px-3 py-2 sm:px-4 sm:py-2 font-medium whitespace-nowrap text-sm sm:text-base flex-1 sm:flex-none">
              + Add Column
            </button>
            <button className="bg-[#4AA181] text-white rounded px-3 py-2 sm:px-4 sm:py-2 font-medium whitespace-nowrap text-sm sm:text-base flex-1 sm:flex-none">
              + Add Row
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-1 pt-1">
        <div className="overflow-x-auto">
          <div className="max-h-[457px]">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="sticky top-0 z-10 bg-[#f8fafc]">
                <tr>
                  {columns.map(col => (
                    <th
                      key={col.key}
                      className="px-3 py-2 text-left font-semibold text-sm border-b border-gray-200 cursor-pointer select-none"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sort.key === col.key && sort.direction === 'asc' && <span className="text-xs text-[#4AA181]">▲</span>}
                        {sort.key === col.key && sort.direction === 'desc' && <span className="text-xs text-[#4AA181]">▼</span>}
                        {(sort.key !== col.key) && <span className="text-xs text-gray-300">⇅</span>}
                      </div>
                      <input
                        type="text"
                        placeholder={`Filter ${col.label}`}
                        className="mt-1 w-full border border-gray-200 rounded px-2 py-1 text-xs focus:border-[#4AA181] focus:ring-1 focus:ring-[#4AA181] outline-none"
                        value={filters[col.key] || ''}
                        onChange={e => {
                          setFilters(f => ({ ...f, [col.key]: e.target.value }));
                          setPage(1);
                        }}
                        onClick={e => e.stopPropagation()}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                      {columns.map(col => (
                        <td
                          key={col.key}
                          className="px-3 py-2 text-sm align-top border-b border-gray-100"
                          style={{ maxWidth: 260, wordBreak: 'break-word' }}
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sticky Pagination Controls */}
        <div className="sticky bottom-0 bg-white z-20 border-t mt-4 py-3 px-4">
          <div className="flex items-center justify-between flex-wrap gap-2 sm:flex-nowrap">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-1 overflow-x-auto max-w-full sm:overflow-visible">
              <button
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 shrink-0"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded shrink-0 ${page === i + 1 ? 'bg-[#4AA181] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 shrink-0"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransformationTable;
