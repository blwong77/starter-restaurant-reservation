import React from "react";

export default function TableHeaders({ headerCols }) {
  return (
    <>
      {headerCols.map((col) => (
        <th key={col.toString()}>{col}</th>
      ))}
    </>
  );
}
