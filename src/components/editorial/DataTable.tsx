import React from 'react';

interface DataTableProps {
  columns: string[];
  rows: React.ReactNode[][];
  /** Optional note rendered under the table, e.g. a source or caveat. */
  note?: React.ReactNode;
}

/**
 * Plain editorial table. Scrolls horizontally on narrow screens rather than
 * collapsing into stacked cards — for reference data (limits, fees, weightings)
 * keeping the columns aligned is what makes it scannable.
 */
export const DataTable: React.FC<DataTableProps> = ({ columns, rows, note }) => {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <figcaption className="fine-print mt-2.5">{note}</figcaption>}
    </figure>
  );
};
