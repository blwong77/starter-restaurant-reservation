import React from "react";

export default function TableData({ tableData }) {
  return (
    <>
      {tableData.map((data) => (
        <td key={data.toString()}>{data}</td>
      ))}
    </>
  );
}
