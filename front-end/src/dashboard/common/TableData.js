import React from "react";

export default function TableData({ tableData }) {
  return (
    <>
      {tableData.map((data) => (
        <td>{data}</td>
      ))}
    </>
  );
}
